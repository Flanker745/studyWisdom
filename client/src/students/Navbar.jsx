import React, { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

import { UserContext } from "../components/UserContext";
import { Link } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { VscFileSubmodule } from "react-icons/vsc";
import { GoGoal } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";

function Navbar() {
  const { sidebarToggle, setSidebarToggle } = useContext(UserContext);
  const [selected, setSelected] = useState("");
  const [page, setPage] = useState("");

  const handleMenuClick = (menu) => {
    setSelected(selected === menu ? "" : menu);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest("aside")) {
      setSidebarToggle(false);
    }
  };

  return (
    <>
      <aside
        className={`absolute min-w-[250px] left-0 top-0 z-[9999] text-white bg-[rgb(28_36_52)] flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarToggle ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={handleOutsideClick}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link
            onClick={() => {
              setSidebarToggle(false);
            }}
            className="rounded-full overflow-hidden m-auto mt-3"
            to="/dashboard"
          >
            <img src="/src/assets/logo/logo.png" width={80} alt="Logo" />
          </Link>
          <button
            className="block lg:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarToggle(!sidebarToggle);
            }}
          >
            <FaArrowLeft />
          </button>
        </div>
        {/* SIDEBAR HEADER */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            <div>
              <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2"></h3>

              <ul className="mb-6 flex flex-col gap-5">
                {/* Menu Item Chart */}
                <li>
                  <Link
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "home" || page === "home"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    to={"/"}
                    onClick={(e) => {
                      handleMenuClick("home");
                    }}
                  >
                    <CgWebsite className="text-[22px]" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "Notes" || page === "Notes"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    to={""}
                    onClick={(e) => {
                      handleMenuClick("Notes");
                    }}
                  >
                    <GrNotes className="text-[22px]" />
                    Notes
                  </Link>
                </li>
                <li>
                  <Link
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "Dpp" || page === "Dpp"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    to={"/student/dpp"}
                    onClick={(e) => {
                      handleMenuClick("Dpp");
                    }}
                  >
                    <GoGoal className="text-[22px]" />
                    Dpp
                  </Link>
                </li>
                <li>
                  <Link
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "Modules" || page === "Modules"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    to={"/student/modules"}
                    onClick={(e) => {
                      handleMenuClick("Modules");
                    }}
                  >
                    <VscFileSubmodule className="text-[22px]" />
                    Modules
                  </Link>
                </li>
                <li>
                  <Link
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "Result" || page === "Result"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    to={"/student/results"}
                    onClick={(e) => {
                      handleMenuClick("Result");
                    }}
                  >
                    <IoNewspaperOutline className="text-[22px]" />
                    Result
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
