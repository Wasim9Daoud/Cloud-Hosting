"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchArticleInput = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/articles/search?searchInputValue=${searchText}`);
  };

  return (
    <form className="my-5 w-full md:w-2/3 m-auto " onSubmit={formSubmitHandler}>
      <input
        type="search"
        placeholder=" search for articles"
        className="w-full p-3 rounded text-xl border-none text-gray-900 outline-none"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
    </form>
  );
};

export default SearchArticleInput;
