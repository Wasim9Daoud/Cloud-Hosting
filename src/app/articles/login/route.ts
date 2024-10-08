import { NextRequest, NextResponse } from "next/server";
import { loginUserSchema } from "@/utils/validation";
import prisma from "@/utils/db";
import { loginUserDTO } from "@/utils/types";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { setCookie } from "@/utils/generateToken";

/**
 * @method  POST
 * @route   api/users/login
 * @dec     login to Profile
 * @access  Public
 **/


export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as loginUserDTO;
    // validation
    const validation = loginUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors[0].message, {
        status: 400,
      });
    }
    // check if this account is exist in data-base
    const user = (await prisma.user.findUnique({
      where: { email: body.email },
    })) as User;
    if (!user) {
      return NextResponse.json(
        { message: " invalid Email or Password " },
        { status: 400 }
      );
    }
    // check if password is correct
    const passwordIsMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordIsMatch) {
      return NextResponse.json(
        { message: " incorrect password " },
        { status: 400 }
      );
    }
    // create token
    const payload = {
      username: user.username,
      id: user.id,
      isadmin: user.isadmin,
    };
    // Set Cookie
    const cookie = setCookie( payload )
    // send response to client
    return NextResponse.json(
      { message: " login successfully " },
      { status: 200 ,
        headers : {
          "Set-Cookie" : cookie
        } 
      } 
    );
  } catch (error) {
    return NextResponse.json(
      { message: " internal server error " },
      { status: 500 }
    );
  }
}
