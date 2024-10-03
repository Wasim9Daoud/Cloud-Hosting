import AddArticleForm from "@/components/forms/AddArticleForm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyTokenForPages } from "@/utils/verifyToken"

const AdminDashboard = async () => {
  const token = cookies().get('jwtToken')?.value || "";
  const payload = verifyTokenForPages( token );
  if( !token ){
    redirect('/')
  }
  if( !payload?.isadmin ){
    redirect('/')
  }
  return (
    <div className="page-Height pt-[50px] px-5 lg:px-20">
      <div className=" shadow p-4 bg-purple-400 rounded w-full ">
        <h2 className="text-xl lg:text-2xl text-gray-600 font-semibold mb-4">
          Add New Article
        </h2>
        <AddArticleForm />
      </div>
    </div>
  )
}

export default AdminDashboard
