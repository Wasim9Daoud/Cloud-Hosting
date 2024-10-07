import prisma from "@/utils/db";
import { updateCommentDTO, updateCommentProps } from "@/utils/types";
import { updateCommentSchema } from "@/utils/validation";
import { verifyToken } from "@/utils/verifyToken";
import { Prisma, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method  PUT
 * @route   api/comments/:id
 * @dec     Update a Comment
 * @access  only comment owner
 **/
export async function PUT(
  request: NextRequest,
  { params }: updateCommentProps
) {
  try {
    // check if this user is comment owner
    const user = verifyToken(request) as User;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json(
        { message: " Please Log In first.. Access Denied " },
        { status: 403 }
      );
    }
    if (!user || user.id !== comment?.userId) {
      return NextResponse.json(
        { message: " only comment owner can update it.. Access Denied " },
        { status: 403 }
      );
    }
    const body = (await request.json()) as updateCommentDTO;
    const validation = updateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // update the comment
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: { text: body.text },
    });
    // send response to client
    return NextResponse.json(updatedComment, { status: 200 });
    return;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: " internal server error " },
      { status: 500 }
    );
  }
}

/**
 * @method  DELETE
 * @route   api/comments/:id
 * @dec     Delete a Comment
 * @access  only comment owner && Admin
 **/

export async function DELETE(
  request: NextRequest,
  { params }: updateCommentProps
) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    console.log(comment);
    if (!comment) {
      return NextResponse.json(
        { message: " comment not found " },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: " you need to logIn first.. access Denied " },
        { status: 403 }
      );
    }
    if ( user.id !== comment.userId) {
      return NextResponse.json(
        { message: " only comment-owner can delete this comment " },
        { status: 403 }
      );
    }
    if (user.id === comment.userId) {
      await prisma.comment.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json({
        message: " your comment hav been deleted successfully ",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: " internal server error " },
      { status: 500 }
    );
  }
}
