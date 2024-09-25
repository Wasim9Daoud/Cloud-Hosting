import { paginationPageProps } from "@/utils/types";
import Link from "next/link";

const Pagination = async ({
  pages,
  pageNumber,
  route,
}: paginationPageProps) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  return (
    <div className=" flex items-center justify-center mt-2 mb-4">
      <Link
        href={`${route}?pageNumber=${pageNumber - 1}`}
        className={
          pageNumber != 1
            ? "border hover:border-purple-900 duration-1000 border-white text-white bg-purple-900 py-1 px-3 font-bold text-xl  cursor-pointer hover:bg-white hover:text-purple-900 rounded-lg transition"
            : "border hover:border-purple-900 duration-1000 border-white text-white bg-gray-900 hidden py-1 px-3 font-bold text-xl  cursor-pointer hover:bg-white hover:text-purple-900 rounded-lg transition"
        }
      >
        Prev
      </Link>{" "}
      {pagesArray.map((item) => (
        <Link
          href={`${route}?pageNumber=${item}`}
          key={item}
          className={`${
            pageNumber === item
              ? "bg-purple-900 border hover:border-purple-900 border-white duration-700  text-white py-1 px-3 font-bold text-xl cursor-pointer hover:bg-white hover:text-purple-900 rounded-lg transition"
              : "bg-white border hover:border-purple-900 border-white  duration-700 text-purple-900 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-white hover:text-purple-900 rounded-lg transition"
          }`}
        >
          {item}
        </Link>
      ))}
      <Link
        href={`${route}?pageNumber=${pageNumber + 1}`}
        className={
          pageNumber < pages
            ? "border hover:border-purple-900 duration-1000 border-white text-white bg-purple-900 py-1 px-3 font-bold text-xl  cursor-pointer hover:bg-white hover:text-purple-900 rounded-lg transition"
            : "border hover:border-purple-900 duration-1000 border-white text-white bg-gray-900 hidden py-1 px-3 font-bold text-xl  cursor-pointer hover:bg-white hover:text-purple-900 rounded-lg transition"
        }
      >
        Next
      </Link>{" "}
    </div>
  );
};
export default Pagination;
