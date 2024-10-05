import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPages } from "@/utils/verifyToken";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import AdminCommentsTable from "./AdminCommentsTable";
import { Comment } from "@prisma/client";

const CommentsTable = async () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPages(token);
  if (!token) {
    redirect("/");
  }
  if (!payload?.isadmin) {
    redirect("/");
  }
  const response = await axios.get(`${DOMAIN}/api/comments`);
  const comments: Comment[] = response.data;
  return (
    <section>
      <AdminCommentsTable comments={comments} />
    </section>
  );
};

export default CommentsTable;
