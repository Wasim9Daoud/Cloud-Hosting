import Logo from "./logo/Logo";
import RightBar from "./Rightbar/RightBar";
import style from "@/components/header/header.module.css";
import NavBar from "./navBar/NavBar";
import { cookies } from "next/headers";
import { verifyTokenForPages } from "@/utils/verifyToken";

const Header = () => {
  const token = cookies().get('jwtToken')?.value || "";
  const payload = verifyTokenForPages( token );
  return (
    <div className="h-[65px] flex sticky top-0 items-center justify-between py-[0] px-[40px] bg-white transition-all duration-1000" >
      <Logo />
      <NavBar isAdmin={payload?.isadmin || false}/>
      <RightBar />
    </div>
  ); 
};

export default Header;

