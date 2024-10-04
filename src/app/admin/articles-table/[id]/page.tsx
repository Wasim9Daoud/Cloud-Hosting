import { DOMAIN } from "@/utils/constants";
import { updateArticlePageProps } from "@/utils/types";
import { verifyTokenForPages } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UpdateArticleForm from "@/components/articles/updateArticleForm";

const EditArticlePage = async ({ params }: updateArticlePageProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) {
    redirect("/");
  }
  const payload = verifyTokenForPages(token);
  if (!payload) {
    redirect("/");
  }
  const response = await axios.get(`${DOMAIN}/api/articles/${params.id}`);
  const article: Article = response?.data;

  return (
    <div>
      <UpdateArticleForm article={article} />
    </div>
  );
};

export default EditArticlePage;
