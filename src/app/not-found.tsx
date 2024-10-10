import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <section className="page-Height flex justify-center items-center flex-col">
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <p className="text-gray-500 text-3xl mt-2 mb-5">Page Not Found</p>
      <Link className="underline text-xl text-blue-700" href="/">Go to Home Page</Link>
    </section>
  );
};

export default NotFound;
