import React from "react";

const loading = () => {
  return (
    <section className=" page-Height animate-pulse container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className=" bg-white h-48 p-7 rounded-lg mb-4">
        <h1 className=" bg-gray-400 w-1/4 h-7 rounded-lg mb-2"></h1>
        <h2 className=" bg-gray-300 w-1/4 h-7 rounded-lg"></h2>
        <p className="bg-gray-300 w-3/4 h-7 rounded-lg mt-3"></p>
      </div>
      <div className="bg-white h-12 mb-4  p-4 rounded-lg">
        <p className="bg-gray-300 w-1/4 h-5 rounded-lg "></p>
      </div>
      <h4 className="bg-white h-12 mb-4  p-7 rounded-lg flex justify-center">
        <p className="bg-gray-300 w-1/4 h-5 rounded-lg "></p>
      </h4>
    </section>
  );
};

export default loading;
