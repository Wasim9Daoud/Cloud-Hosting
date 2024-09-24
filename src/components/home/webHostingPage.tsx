import { TiTick } from "react-icons/ti";

const WebHostingPlan = () => {
  return (
    <div className="flex justify-center shadow-lg items-center flex-col w-3/4 bg-purple-100 mb-7 md:w-2/4 lg:w-1/4 p-[5px] rounded-xl">
      <h3 className="text-3xl font-bold text-purple-900">Premium</h3>
      <strong className="text-3xl font-bold text-gray-500 my-5">
        $4.99/mo
      </strong>
      <span className="bg-red-200 text-red-900 rounded-full px-2 py-1 font-semibold">
        10% OFF
      </span>
      <div className="mt-6">
        <h5 className="text-2xl mb-1 font-semibold text-purple-700">
          Top Features
        </h5>
        <div className="flex items-center text-green-700 mb-1 ps-3">
          <TiTick /> 100 Website
        </div>
        <div className="flex items-center text-green-700 mb-1 ps-3">
          <TiTick /> 100 GB SSD Strong
        </div>{" "}
        <div className="flex items-center text-green-700 mb-1 ps-3">
          <TiTick /> Weekly Backups
        </div>{" "}
        <div className="flex items-center text-green-700 mb-1 ps-3">
          <TiTick /> Unlimited Bandwidth
        </div>{" "}
        <div className="flex items-center text-green-700 mb-1 ps-3">
          <TiTick /> Free SLL
        </div>{" "}
        <div className="flex items-center text-green-700 mb-1 ps-3">
          <TiTick /> Free Email
        </div>
      </div>
      <button className="mt-4 border-2 text-purple-700 border-purple-900 font-bold p-1 rounded-full hover:text-white hover:bg-purple-900 transition duration-1000 w-full ">
        BUY NOW
      </button>
    </div>
  );
};

export default WebHostingPlan;
