const loading = () => {
    const articleArray = [1, 2, 3, 4, 5, 6];
    return (
      <section className="page-Height container m-auto animate-pulse">
        <div className="my-5 w-full h-12 md:w-2/3 m-auto bg-gray-300 rounded-md"></div>
        <div className=" flex flex-wrap items-center justify-center w-full">
          {articleArray.map((article) => (
            <div key={article} className="p-5 my-1 w-full md:w-2/5 lg:w-1/3 ">
              <h3 className=" bg-gray-300 w-full h-7 rounded-md"></h3>
              <p className=" my-2 w-full h-16 bg-gray-400 p-1 rounded-md "></p>
              <div className=" bg-gray-500 h-5 w-full block p-1 rounded-md"></div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className=" w-2/5 h-7 rounded-md bg-gray-400 mt-3 mb-10"></div>
        </div>
      </section>
    );
  };
  
  export default loading;
  