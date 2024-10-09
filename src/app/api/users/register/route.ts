import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { RegisterNewUserSchema } from "@/utils/validation";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";
import { registerNewUserDTO } from "@/utils/types";

/**
 * @method  POST
 * @route   api/users/register
 * @dec     Register a new User
 * @access  public
 **/
export async function POST(request: NextRequest) {
  try {
    const body : registerNewUserDTO = await request.json();
    // validation
    const validation = RegisterNewUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message : validation.error.errors[0].message }, {
        status: 400,
      });
    }
    // checking if user already exist
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: " this account is already exist " },
        { status: 400 }
      );
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, salt);
    // create a new user in db
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashPassword,
      },
      select: {
        id: true,
        isadmin: true,
        username: true,
      },
    });
    // create token
    const payload = {
      id: newUser.id,
      username: newUser.username,
      isadmin: newUser.isadmin,
    };
    // Set Cookie
    const cookie = setCookie(payload);
    // Send Response ( Cookie && newUser )
    return NextResponse.json(
      { ...newUser , message : "Registered & Authenticated"},
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: " internal server error " },
      { status: 500 }
    );
  }
}
