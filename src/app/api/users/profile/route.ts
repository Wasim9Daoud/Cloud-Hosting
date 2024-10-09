import { NextRequest, NextResponse } from "next/server";
import { getProfileProps, JWTPayload, updateProfileDTO } from "@/utils/types";
import prisma from "@/utils/db";
import { User } from "@prisma/client";
import { verifyToken } from "@/utils/verifyToken";
import bcrypt from "bcryptjs";
import { updateProfileSchema } from "@/utils/validation";

/**
 * @method  DELETE
 * @route   api/users/profile/:id
 * @dec     Delete the Profile
 * @access  Admin || Profile-Owner
 **/

export async function DELETE(
  request: NextRequest,
  { params }: getProfileProps
) {
  try {
    // check if this profile is exist in DataBase
    const profile = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: true,
      },
    });
    if (!profile) {
      return NextResponse.json(
        { message: " this profile is not exist " },
        { status: 404 }
      );
    }
    // check if this user is profile-owner or admin or just user
    const tokenPayload = verifyToken(request);

    // check if this user is ( Admin | Profile-Owner )
    if (
      !(tokenPayload?.id === parseInt(params.id)) &&
      tokenPayload?.isadmin === false
    ) {
      return NextResponse.json(
        {
          message:
            " only Profile-Owner or Admins can delete this Profile.. Forbidden ",
        },
        { status: 403 }
      ); // forbidden
    }
    // get this user comments
    const commentsIds = profile?.comments.map((comment) => comment.id);
    // delete this comments from DataBase
    await prisma.comment.deleteMany({
      where: {
        id: {
          in: commentsIds,
        },
      },
    });
    // delete this user
    await prisma.user.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json(
      { message: " Profile hav been Deleted Successfully " },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: " internal server error " },
      { status: 500 }
    );
  }
}

/**
 * @method  GET
 * @route   api/users/profile/:id
 * @dec     Get the Profile
 * @access  Profile-Owner
 **/
export async function GET(request: NextRequest, { params }: getProfileProps) {
  try {
    // get the profile from DataBase
    const profile = (await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: {
          select: {
            id: true,
            text: true,
            articleId: true,
          },
        },
      },
    })) as User;
    // check if this profile is exist or not
    if (!profile) {
      return NextResponse.json(
        { message: " profile not found " },
        { status: 404 }
      );
    }
    // check if this user is Profile-OWner or not
    const tokenPayload = verifyToken(request) as JWTPayload;
    if (tokenPayload === null || tokenPayload?.id !== profile.id) {
      return NextResponse.json(
        { message: " Only Profile Owner can get the Profile.. Access Denied " },
        { status: 403 }
      );
    }
    const { password, ...other } = await profile;
    if (tokenPayload.id === profile?.id) {
      return NextResponse.json({ ...other }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: " internal server error " },
      { status: 500 }
    );
  }
}

/**
 * @method  PUT
 * @route   api/users/profile/:id
 * @dec     Update the Profile
 * @access  Profile-Owner
 **/

export async function PUT(request: NextRequest, { params }: getProfileProps) {
  try {
    // get request-data from client
    const body = await request.json();

    // get the profile from DataBase
    const profile = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    // check if this profile is exist or not
    if (!profile) {
      return NextResponse.json(
        { message: " profile not found " },
        { status: 404 }
      );
    }
    // check if this user is profile-owner or not
    const tokenPayload = verifyToken(request);
    if (!tokenPayload || tokenPayload?.id !== profile?.id) {
      return NextResponse.json(
        { message: " only Profile-Owner can Update this Profile " },
        { status: 403 }
      );
    }
    // validation
    const validation = updateProfileSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    // check if this entered email is already exist or not
    const users = await prisma.user.findMany();
    const email = users.find((user) => user.email == body.email);
    if (email) {
      return NextResponse.json(
        {
          message: " this email is already exist.. please chose another Email ",
        },
        { status: 400 }
      );
    }
    // hash the password
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    // update the profile
    const updatedProfile = await prisma.user.update({
      where: { id: profile?.id },
      data: {
        username: body.username,
        password: body.password,
        email: body.email,
      },
    });
    // delete password from response
    const { password, ...other } = updatedProfile;
    // send Response to client
    return NextResponse.json(
      { message: " your profile hav been updated successfully ", ...other },
      { status: 200 }
    );
    //
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: " internal server error " },
      { status: 500 }
    );
  }
}
