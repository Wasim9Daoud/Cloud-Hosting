import { FaCloud } from "react-icons/fa";

import style from "@/components/header/header.module.css";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href='/' className={style.logo}>
      <h1>CLOUD</h1>
      <FaCloud />
      <h1>HOSTING</h1>
    </Link>
  );
};

export default Logo;
