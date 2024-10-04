"use client";
import DeleteArticleButton from "@/components/articles/DeleteArticleButton";
import { DOMAIN } from "@/utils/constants";
import { AdminArticlesTableProps } from "@/utils/types";
import Link from "next/link";

const AdminArticlesTable = ({ articles }: AdminArticlesTableProps) => {
  return (
    <div className="md:p-5">
      <table className="w-full table-auto border-2">
        <thead className="border-b-4 border-t-4 border-purple-900">
          <tr>
            <th className="p-3 max-w-[175] overflow-auto text-start md:text-xl text-purple-700">Title</th>
            <th className="p-3 text-start md:text-xl text-purple-700">
              CreatedAt
            </th>
            <th className="p-3 md:text-xl text-purple-700 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {articles?.map((article) => (
            <tr key={article.id} className="border-b-2 border-purple-900">
              <td className="p-5 text-gray-800 font-bold">{article.title}</td>
              <td className="p-5 text-gray-600">
                {new Date(article.createdAt).toDateString()}
              </td>
              <td className="p-5 text-gray-600 flex flex-col gap-[10px] sm:flex-row justify-center items-center">
                <Link
                  href={`${DOMAIN}/admin/articles-table/${article.id}`}
                  className="px-3 py-1 mx-2 bg-green-500 rounded-lg text-white"
                >
                  Edit
                </Link>
                <DeleteArticleButton article={article} />
                <Link
                  href={`${DOMAIN}/articles/${article.id}`}
                  className="px-3 py-1 mx-2 bg-blue-500 rounded-lg text-white"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticlesTable;
