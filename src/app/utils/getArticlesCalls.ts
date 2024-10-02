import { Article } from "@prisma/client";

// grt articles by page-number
export async function getArticles(pageNumber:string) : Promise<Article[]> {
        const response = await fetch(
            `http://localhost:3000/api/articles?pageNumber=${pageNumber}`,
            { cache: "no-cache" }
          );
          if (!response.ok) {
            throw new Error(" Failed to Fetch Articles ");
          }
          const articles: Article[] = await response.json()
          return articles
}

// get article based on search input
export async function getArticlesBasedOnSearch(searchText:string) : Promise<Article[]> {
  const response = await fetch(
      `http://localhost:3000/api/articles/search?searchText=${searchText}`,
      { cache: "no-cache" }
    );
    if (!response.ok) {
      throw new Error(" Failed to Fetch Articles ");
    }
    const articles: Article[] = await response.json()
    return articles
}
