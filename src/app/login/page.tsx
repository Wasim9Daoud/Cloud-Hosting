import LoginForm from "@/components/forms/loginForm";
import { cookies } from "next/headers";

const login = () => {
  const token = cookies().get("jwtToken")?.value

  return (
    <section className="overflow-height container m-auto pt-[50px] md:pt-[100px] ">
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Log In</h1>
        <LoginForm token={token}/>
      </div>
    </section>
  );
};

export default login;
