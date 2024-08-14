import React, { useContext, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { UserContext } from "../components/UserContext";

function Header() {
  const { sidebarToggle, setSidebarToggle } = useContext(UserContext);

  const handleToggle = () => {
    setSidebarToggle(!sidebarToggle);
  };
  return (
    <>
      <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow items-center justify-between lg:justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
          {" "}
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            {/* Hamburger Toggle BTN */}
            <button
              className="z-[99999] text-lg block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
              onClick={handleToggle}
            >
              <IoMenu />
            </button>
            {/* Logo */}
            <a
              className="block flex-shrink-0 overflow-hidden rounded-full lg:hidden"
              href="index.html"
            >
              <img src="/src/assets/logo/logo.png" width={60} alt="Logo" />
            </a>
          </div>
          <div className="flex bg-red-500 p-2 text-lg rounded-full text-white items-center gap-3 2xsm:gap-7">
            <FaUser />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
