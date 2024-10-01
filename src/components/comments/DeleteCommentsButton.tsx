import { deleteCommentsButtonProps } from "../../utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { DOMAIN } from "../../utils/constants";

const DeleteCommentButton = ({ comment }: deleteCommentsButtonProps) => {
  const router = useRouter();
  const deleteCommentHandler = async () => {
    try {
      if (confirm("you will delete this comment.. are you sure ?")) {
        const response = await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        toast.success(response?.data.message);
      }
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  }
return(
  <button
  onClick={deleteCommentHandler}
  className="px-3 py-1 mx-2 bg-red-500 rounded-lg text-white"
>
  Delete
</button>
)

};

export default DeleteCommentButton;
