import style from "@/components/header/header.module.css";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyTokenForPages } from "@/utils/verifyToken";
import Logout from "./Logout";

const RightBar = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPages(token);

  return (
    <div className="flex gap-2">
      {token ? (
        <>
          <strong className="md:text-lg text-purple-500 capitalize">
            {payload?.username}
          </strong>
          <Logout />
        </>
      ) : (
        <>
          <Link href="/login" className={style.btn}>
            Login
          </Link>
          <Link href="/register" className={style.btn}>
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default RightBar;
