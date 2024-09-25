import Link from "next/link";
import { ArticleItemProps } from "@/utils/types";

const ArticleItem = ({ article }: ArticleItemProps) => {
    return (
      <div className="p-5 hover rounded-lg my-1 shadow-lg border-2 border-purple-400 hover:bg-purple-200 duration-500 w-full md:w-2/5 lg:w-1/4 ">
        <h3 className=" text-xl text-center font-bold text-gray-900 line-clamp-1">
          {article.title}
        </h3>
        <p className=" my-2 text-xl text-gray-500 p-1 line-clamp-1">
          {article.decription}
        </p>
        <Link
          className="text-xl bg-purple-500 hover:bg-purple-800 w-full block text-center p-1 text-white duration-500 rounded-lg"
          href={`/articles/${article.id}`}
        >
          Read More
        </Link>
      </div>
    );
};

export default ArticleItem;
