import { NextRequest, NextResponse } from "next/server";
import { createArticleDTO } from "@/utils/types";
import { createArticleSchema } from "@/utils/validation";

import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import { verifyToken } from "@/utils/verifyToken";
import { ARTICLES_PEAR_PAGE } from "@/utils/constants";

/**
 * @method  GET
 * @route   api/articles
 * @dec     get articles by page number
 * @access  public
 **/
export async function GET(request: NextRequest) {
  try {
    const pageNumber =
      (request.nextUrl.searchParams.get("pageNumber") as string) || "1" ;
    const articles = await prisma.article.findMany({
      skip: ARTICLES_PEAR_PAGE * ( parseInt(pageNumber) - 1  ) ,
      take: ARTICLES_PEAR_PAGE ,
      orderBy : {
        "createdAt" : "desc"
      }
    });
    return NextResponse.json( articles  , { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method  POST
 * @route   api/articles
 * @dec     create a new article
 * @access  only Admin
 **/
export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as createArticleDTO;
    const user = verifyToken(request);
    if (!user || user.isadmin === false) {
      return NextResponse.json(
        { message: "Only Admin Can Create Articles.. Access Denied " },
        { status: 403 }
      );
    }

    const validation = createArticleSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json({ message : validation.error.errors[0].message }, {
        status: 400,
      });
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: data.title,
        decription: data.decription,
      },
    });

    return NextResponse.json(
      { message: " article hav been added successfully " },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
