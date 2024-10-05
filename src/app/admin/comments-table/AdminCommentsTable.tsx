"use client";

import DeleteCommentButton from "@/components/comments/DeleteCommentsButton";
import { CommentsTablePageProps } from "@/utils/types";

const AdminCommentsTable = ({ comments }: CommentsTablePageProps) => {
  return (
    <div className="sm:p-5">
      <table className="w-full border-2">
        <thead className="border-b-4 border-t-4 border-purple-900">
          <tr>
            <th className="sm:p-3 px-1 py-4 text-start md:text-xl text-purple-700">Title</th>
            <th className="sm:p-3 px-1 py-4 text-start md:text-xl text-purple-700">
              CreatedAt
            </th>
            <th className="sm:p-3 p-1 py-4 md:text-xl text-purple-700 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {comments?.map((comment) => (
            <tr key={comment.id} className="border-b-2 border-purple-900">
              <td className="sm:p-5 px-1 py-3 text-gray-600 overflow-auto max-w-[175px]">{comment.text}</td>
              <td className="sm:p-5 px-1 py-3 text-gray-600 min-w-[100px]">
                {new Date(comment.createdAt).toDateString()}
              </td>
              <td className="sm:p-5 px-1 py-3 text-gray-600 flex justify-center items-center ">
                <DeleteCommentButton comment={comment} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCommentsTable;
