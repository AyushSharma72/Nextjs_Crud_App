import Link from "next/link";
import React from "react";
import { TbBrandNextjs } from "react-icons/tb";
import { FaPlusCircle } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className="flex w-[60%] justify-between m-auto p-3 navbar mt-2 rounded">
      <Link href="/">
        <TbBrandNextjs className="text-3xl" />
      </Link>
      <Link href="/create">   <div className="flex items-center gap-2 bg-white rounded-md text-black p-2 hover:bg-black hover:text-white transition-colors duration-300 ">
        Create
        <FaPlusCircle />
      </div>
      </Link>
    </div>
  );
};

export default Navbar;
