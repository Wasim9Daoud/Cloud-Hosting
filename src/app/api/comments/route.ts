import { commentDTO } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { createCommentSchema } from "@/utils/validation";
import { verifyToken } from "@/utils/verifyToken";
import { User } from "@prisma/client";
import prisma from "@/utils/db";

/**
 * @method  CREATE
 * @route   api/comments
 * @dec     create a new comment
 * @access  only logged-in user
 **/
export async function POST(request: NextRequest) {
  try {
    // check if user is logged-in or not
    const user = verifyToken(request) as User;
    if (!user) {
      return NextResponse.json(
        { message: " just logged-in user can write a comment " },
        { status: 401 }
      );
    }
    // Get data from client request
    const body = (await request.json()) as commentDTO;
    // validation
    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    // create a comment
    const comment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });
    // send response to client
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: " internal server error " },
      { status: 500 }
    );
  }
}

/**
 * @method  GET
 * @route   api/comments
 * @dec     GET all Comment
 * @access  only Admin
 **/
export async function GET(request: NextRequest) {
  try {
    // Get all comments
    const comments = await prisma.comment.findMany({
      orderBy : {
        "createdAt" : "desc"
      }
    });
    // send response to client
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: " internal server error " },
      { status: 500 }
    );
  }
}
