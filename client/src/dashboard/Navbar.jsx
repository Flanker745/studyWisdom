import React, { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { UserContext } from "../components/UserContext";
import { Link } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { VscFileSubmodule } from "react-icons/vsc";
import { GoGoal } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
import { MdOutlineOndemandVideo } from "react-icons/md";

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
                      selected === "dashboard" || page === "dashboard"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    to={"/dashboard"}
                    onClick={(e) => {
                      handleMenuClick("dashboard");
                    }}
                  >
                    <LuLayoutDashboard className="text-[22px]" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <div
                    className={`group relative hover:cursor-pointer flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "Tables" || page === "tables"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick("Tables");
                    }}
                  >
                    <PiStudentFill className="text-[25px]" />
                    Students
                    <IoMdArrowDropdown
                      className={`absolute text-[30px] right-9 top-1/2 -translate-y-1/2 transition-transform ${
                        selected === "Tables" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {selected === "Tables" && (
                    <ul className="pl-8 animate-fadeIn">
                      <li>
                        <Link
                          onClick={() => {
                            setPage("tables");
                            setSidebarToggle(false);
                          }}
                          to={"/dashboard/addStudent"}
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "tables"
                              ? "bg-graydark dark:bg-meta-4"
                              : ""
                          }`}
                        >
                          Add Students
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "tables"
                              ? "bg-graydark dark:bg-meta-4"
                              : ""
                          }`}
                          to="/dashboard/viewStudent"
                          onClick={() => {
                            setPage("tables");
                            setSidebarToggle(false);
                          }}
                        >
                          View Students
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <div
                    className={`group relative flex hover:cursor-pointer items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "notes" || page === "notes"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick("notes");
                    }}
                  >
                    <GrNotes className="text-[20px]" />
                    Notes
                    <IoMdArrowDropdown
                      className={`absolute text-[30px] right-9 top-1/2 -translate-y-1/2 transition-transform ${
                        selected === "notes" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {selected === "notes" && (
                    <ul className="pl-8 animate-fadeIn">
                      <li>
                        <Link
                          onClick={() => {
                            setPage("notes");
                            setSidebarToggle(false);
                          }}
                          to={"/dashboard/addNotes"}
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "notes" ? "bg-graydark dark:bg-meta-4" : ""
                          }`}
                        >
                          Add Notes
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "notes" ? "bg-graydark dark:bg-meta-4" : ""
                          }`}
                          to="/dashboard/viewNotes"
                          onClick={() => {
                            setPage("notes");
                            setSidebarToggle(false);
                          }}
                        >
                          View Notes
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <div
                    className={`group relative flex hover:cursor-pointer items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "module" || page === "module"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick("module");
                    }}
                  >
                    <VscFileSubmodule className="text-[20px]" />
                    Modules
                    <IoMdArrowDropdown
                      className={`absolute text-[30px] right-9 top-1/2 -translate-y-1/2 transition-transform ${
                        selected === "module" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {selected === "module" && (
                    <ul className="pl-8 animate-fadeIn">
                      <li>
                        <Link
                          onClick={() => {
                            setPage("module");
                            setSidebarToggle(false);
                          }}
                          to={"/dashboard/addModules"}
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "module"
                              ? "bg-graydark dark:bg-meta-4"
                              : ""
                          }`}
                        >
                          Add Module
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "module"
                              ? "bg-graydark dark:bg-meta-4"
                              : ""
                          }`}
                          to="/dashboard/viewModules"
                          onClick={() => {
                            setPage("module");
                            setSidebarToggle(false);
                          }}
                        >
                          View Modules
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <div
                    className={`group relative flex hover:cursor-pointer items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "dpp" || page === "dpp"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick("dpp");
                    }}
                  >
                    <GoGoal className="text-[20px]" />
                    Dpp
                    <IoMdArrowDropdown
                      className={`absolute text-[30px] right-9 top-1/2 -translate-y-1/2 transition-transform ${
                        selected === "dpp" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {selected === "dpp" && (
                    <ul className="pl-8 animate-fadeIn">
                      <li>
                        <Link
                          onClick={() => {
                            setPage("dpp");
                            setSidebarToggle(false);
                          }}
                          to={"/dashboard/addDpp"}
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "dpp" ? "bg-graydark dark:bg-meta-4" : ""
                          }`}
                        >
                          Add Dpp
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "dpp" ? "bg-graydark dark:bg-meta-4" : ""
                          }`}
                          to="/dashboard/viewDpp"
                          onClick={() => {
                            setPage("dpp");
                            setSidebarToggle(false);
                          }}
                        >
                          View Dpp
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <div
                    className={`group relative flex hover:cursor-pointer items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "result" || page === "result"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick("result");
                    }}
                  >
                    <IoNewspaperOutline className="text-[20px]" />
                    Results
                    <IoMdArrowDropdown
                      className={`absolute text-[30px] right-9 top-1/2 -translate-y-1/2 transition-transform ${
                        selected === "result" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {selected === "result" && (
                    <ul className="pl-8 animate-fadeIn">
                      <li>
                        <Link
                          onClick={() => {
                            setPage("result");
                            setSidebarToggle(false);
                          }}
                          to={"/dashboard/addResults"}
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "result"
                              ? "bg-graydark dark:bg-meta-4"
                              : ""
                          }`}
                        >
                          Add result
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "result"
                              ? "bg-graydark dark:bg-meta-4"
                              : ""
                          }`}
                          to="/dashboard/viewResults"
                          onClick={() => {
                            setPage("result");
                            setSidebarToggle(false);
                          }}
                        >
                          View Results
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <div
                    className={`group relative flex hover:cursor-pointer items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      selected === "video" || page === "video"
                        ? "bg-graydark dark:bg-meta-4"
                        : ""
                    }`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick("video");
                    }}
                  >
                    <MdOutlineOndemandVideo className="text-[20px]" />
                    Videos
                    <IoMdArrowDropdown
                      className={`absolute text-[30px] right-9 top-1/2 -translate-y-1/2 transition-transform ${
                        selected === "video" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {selected === "video" && (
                    <ul className="pl-8 animate-fadeIn">
                      <li>
                        <Link
                          onClick={() => {
                            setPage("video");
                            setSidebarToggle(false);
                          }}
                          to={"/dashboard/addVideos"}
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "video"
                              ? "bg-graydark dark:bg-meta-4"
                              : ""
                          }`}
                        >
                          Add video
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`group flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            page === "video"
                              ? "bg-graydark dark:bg-meta-4"
                              : ""
                          }`}
                          to="/dashboard/viewVideos"
                          onClick={() => {
                            setPage("video");
                            setSidebarToggle(false);
                          }}
                        >
                          View Videos
                        </Link>
                      </li>
                    </ul>
                  )}
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
