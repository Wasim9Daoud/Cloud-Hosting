import ArticleItem from "./ArticleItem";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import Pagination from "@/components/articles/Pagination";
import { articlesPageProps } from "@/utils/types";
import { getArticles } from "@/utils/getArticlesCalls";
import { Article } from "@prisma/client";
import { ARTICLES_PEAR_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";

const articles = async ({ searchParams }: articlesPageProps) => {
  const { pageNumber } = searchParams
  const articles : Article[] = await getArticles(pageNumber)
  const count:number = await prisma.article.count();
  const pages : number = Math.ceil( count / ARTICLES_PEAR_PAGE )
  return (
    <section className="articlesPage-Height  container m-auto px-5 pb-2">
      <SearchArticleInput />
      <div className=" flex items-center justify-center flex-wrap gap-5 mb-[70px]">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination pages={pages} pageNumber={parseInt(pageNumber)} route="/articles"/>
    </section>
  ); 
};

export default articles;
