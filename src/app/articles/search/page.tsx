import { getArticlesBasedOnSearch } from "@/utils/getArticlesCalls";
import { Article } from "@prisma/client";
import ArticleItem from "../ArticleItem";
import Loading from "@/app/Loading";

interface searchArticleProps {
  searchParams: {
    searchInputValue: string;
  };
}

const page = async ({
  searchParams: { searchInputValue },
}: searchArticleProps) => {
  const articles: Article[] = await getArticlesBasedOnSearch(searchInputValue);
  return (
    <section className="page-Height m-auto px-5">
      <h1 className="text-xl text-purple-900 font-bold mt-2 mb-7">
        Articles Based On
        <span className="ms-3 text-green-700 text-2xl font-bold">
          {searchInputValue}
        </span>
      </h1>
      {articles ? (
        <div className="flex items-center justify-center flex-wrap gap-7">
          {articles.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
      {articles.length === 0 && (
        <h1 className="flex justify-center items-center text-2xl text-red-900 mt-10">
          Sorry... no articles with your searching keyword{" "}
          <span className="text-2xl ms-2 text-green-700 font-bold">{`( ${searchInputValue} )`}</span>
        </h1>
      )}
    </section>
  );
};

export default page;
