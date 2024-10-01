"use client";
import { commentItemProps, commentWithUser } from "@/utils/types";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "./updateCommentModal";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";

const CommentItem = ({ comment, userId }: commentItemProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const deleteCommentHandler =async ()=>{
    try {
      if( confirm(" you want to delete this comment.. are you sur ? ") ){
        const done = await axios.delete(`${DOMAIN}/api/comments/${comment.id}`)
        router.refresh()
        toast.success(done.data.message)
      }
    } catch (error:any) {
      toast.error(error?.response?.data.message)
    }
  }

  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300 overflow-auto">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment.user.username}
        </strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <p className="text-gray-800 mb-2">{comment.text}</p>
      <div className="flex justify-end items-center">
        {userId && userId === comment.userId && (
          <>
            <FaEdit
              onClick={() => setOpen(true)}
              className="text-green-600 text-xl cursor-pointer me-3"
            />
            <FaTrash onClick={deleteCommentHandler} className="text-red-600 text-xl cursor-pointer" />
          </>
        )}
      </div>
      {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          commentId={comment.id}
          commentText={comment.text}
        />
      )}
    </div>
  );
};

export default CommentItem;
