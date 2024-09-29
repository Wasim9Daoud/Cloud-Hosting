import { DOMAIN } from "@/utils/constants";
import { deleteArticleButtonProps } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const DeleteArticleButton = ({ article }: deleteArticleButtonProps) => {
  const router = useRouter();
  const deleteArticleHandler = async () => {
    try {
      if (confirm("you will delete this article.. are you sure ?")) {
        const response = await axios.delete(`${DOMAIN}/api/articles/${article.id}`);
        toast.success(response?.data.message);
      }
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <button
      onClick={deleteArticleHandler}
      className="px-3 py-1 mx-2 bg-red-500 rounded-lg text-white"
    >
      Delete
    </button>
  );
};

export default DeleteArticleButton;
