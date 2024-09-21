"use client";
import Link from "next/link";
import style from "../header.module.css";
import { useState } from "react";

import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { navBarPageProps } from "@/utils/types";

const NavBar = ({ isAdmin }: navBarPageProps) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={style.leftBar}>
      <div
        className={style.navbar}
        style={{
          clipPath: (toggle && "polygon(0 0, 100% 0,100% 100% , 0 100%)") || "",
        }}
      >
        {/* navbar */}
        <ul className={style.menuLinks}>
          <Link
            onClick={() => setToggle(false)}
            className={style.navLink}
            href="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setToggle(false)}
            className={style.navLink}
            href="/articles?pageNumber=1"
          >
            Articles
          </Link>
          <Link
            onClick={() => setToggle(false)}
            className={style.navLink}
            href="/about"
          >
            About
          </Link>
          {isAdmin ? (
            <Link
              onClick={() => setToggle(false)}
              className={style.navLink}
              href="/admin"
            >
              Admin Dashboard
            </Link>
          ) : (
            ""
          )}
        </ul>
      </div>
      <button
        onClick={() => setToggle((prev) => !prev)}
        className="text-purple-700 xl:hidden menuBar"
      >
        {toggle ? (
          <IoMdClose className="text-3xl" />
        ) : (
          <HiMenu className="text-3xl" />
        )}
      </button>
    </div>
  );
};

export default NavBar;

