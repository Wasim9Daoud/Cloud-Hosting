import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method  GET
 * @route   api/articles/search?searchText=value
 * @dec     get single article by search text
 * @access  public
 **/

export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    let articles;
    if (searchText) {
      articles = await prisma.article.findMany({
        where: {
          title: {
            // equals : "searchText"
            startsWith: searchText,
            mode: "insensitive",
          },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {}
}
