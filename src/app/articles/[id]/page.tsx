import { ArticleItemProps, articleWithComments } from "@/utils/types";
import AddCommentForm from "@/components/forms/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { cookies } from "next/headers";
import { verifyTokenForPages } from "@/utils/verifyToken";

interface singlePageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: singlePageProps) => {
  const response = await axios.get(`${DOMAIN}/api/articles/${params.id}`);
  const article: articleWithComments = await response.data;
  const token = (cookies().get("jwtToken")?.value as string) || "";
  const payload = verifyTokenForPages(token) || null;
  return (
    <section className=" page-Height container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className=" bg-white p-7 rounded-lg mb-7">
        <h1 className=" text-3xl font-bold text-green-700 mb-2">
          {article.title}
        </h1>
        <h2 className=" text-gray-400">{ new Date( article.createdAt).toDateString() }</h2>
        <p className="text-gray-800 text-xl mt-5">{article.decription}</p>
      </div>
      <div>
        {payload ? (
          <AddCommentForm articleId={article.id} />
        ) : (
          <p className="text-red-500 md:text-xl">
            You should be logged In to write a comment
          </p>
        )}
      </div>
      <h4 className="text-xl text-gray-800 font-semibold mb-2 mt-7">
        Comments
      </h4>
      {article.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
      ))}
    </section>
  );
};

export default page;
