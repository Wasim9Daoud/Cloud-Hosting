import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyTokenForPages } from "@/utils/verifyToken"
import { getArticles } from "@/utils/getArticlesCalls";
import { adminArticlesPageProps } from "@/utils/types";
import AdminArticlesTable from "./AdminArticlesTable";
import { Article } from "@prisma/client";
import Pagination from "@/components/articles/Pagination";
import { ARTICLES_PEAR_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";

const ArticlesTable =async ( { searchParams :{ pageNumber } }  : adminArticlesPageProps ) => {
  const token = cookies().get('jwtToken')?.value || "";
  const payload = verifyTokenForPages( token );
  if( !token ){
    redirect('/')
  }
  if( !payload?.isadmin ){
    redirect('/')
  }
    const articles : Article[] = await getArticles( pageNumber );
    const count:number = await prisma.article.count()
    const pages:number = Math.ceil( count / ARTICLES_PEAR_PAGE );
  return (
    <section>
    <AdminArticlesTable articles={ articles }/>
    <Pagination pages={pages} route={ `/admin/articles-table`} pageNumber={parseInt(pageNumber)}/>
    </section>
  )
}

export default ArticlesTable
