"use client";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const logout = async () => {
    await axios.get(`${DOMAIN}/api/users/logout`);
    router.replace(`/`)
    router.refresh()
  };
  return (
    <div>
      <button
        onClick={logout}
        className="text-white font-bold md:text-lg ml-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
