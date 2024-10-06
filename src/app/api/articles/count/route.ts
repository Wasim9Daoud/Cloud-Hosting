import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method  GET
 * @route   api/articles/count
 * @dec     get articles count
 * @access  Admin
 **/
export async function GET(request: NextRequest) {
  try {
    // const user = verifyToken(request);
    // if (!user || user.isadmin === false) {
    //   return NextResponse.json(
    //     { message: " only Admin can get Articles count " },
    //     { status: 403 }
    //   );
    // }
    const articles = await prisma.article.findMany();
    const count = articles.length;
    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
