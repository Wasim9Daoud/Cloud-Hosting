import { NextRequest, NextResponse } from "next/server";
import { getSingleArticleProps } from "@/utils/types";
import { updateArticleDTO } from "@/utils/types";

import { Article } from "@prisma/client";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 * @method  GET
 * @route   api/articles/:id
 * @dec     get single article
 * @access  public
 **/
export async function GET(
  request: NextRequest,
  { params }: getSingleArticleProps
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: " article not found " },
        { status: 404 }
      );
    }
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method  PUT
 * @route   api/articles/:id
 * @dec     update single article
 * @access  only Admin
 **/
export async function PUT(
  request: NextRequest,
  { params }: getSingleArticleProps
) {
  try {
    const user = verifyToken(request);
    if (!user || user.isadmin === false) {
      return NextResponse.json(
        { message: " only Admin can update the article " },
        { status: 403 }
      );
    }
    const article = (await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    })) as Article;

    if (!article) {
      return NextResponse.json(
        { message: " article not found " },
        { status: 404 }
      );
    }

    const body = (await request.json()) as updateArticleDTO;

    const updatedArticle: Article = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        decription: body.decription,
      },
    });

    return NextResponse.json(
      { message: " your article hav been updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method  DELETE
 * @route   api/articles/:id
 * @dec     delete an article
 * @access  public
 **/
export async function DELETE(
  request: NextRequest,
  { params }: getSingleArticleProps
) {
  try {
    const user = verifyToken(request);
    if (!user || user.isadmin === false) {
      return NextResponse.json(
        { message: " only Admin can delete the article " },
        { status: 403 }
      );
    }
    // get this article from DataBase
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: true,
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: " article not found " },
        { status: 404 }
      );
    }
    // get this article comments IDS from DataBase
    const commentsIds: number[] = article?.comments.map(
      (comment) => comment.id
    );
    // delete this comments
    await prisma.comment.deleteMany({
      where: {
        id: {
          in: commentsIds,
        },
      },
    });
    // delete the article
    await prisma.article.delete({ where: { id: parseInt(params.id) } });

    return NextResponse.json({ message : "article hav been deleted successfully" }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
