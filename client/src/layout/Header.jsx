import React, { useEffect, useState, useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import logo from "/src/assets/logo/logo.png";
import cookie from "react-cookies";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { UserContext } from "../components/UserContext";

function Header() {
  const nav = useNavigate();
  const {
    user,
    existUser,
    exitUserId,
    setExistUser,
    setUser,
    setExitUserId,
    initialLoading,
  } = useContext(UserContext);
  let role;
  if (user) {
    role = user.role;
  }

  const handelLogout = () => {
    cookie.remove("token", { path: "/" });
    cookie.remove("id", { path: "/" });
    setExistUser(null);
    setExitUserId(null);
    setUser(null);
    nav("/");
    window.location.reload(); // Force a page reload to ensure state is reset
  };

  const [showNev, setNev] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (initialLoading) {
    return (
      <header className="fixed w-full z-10 bg-white border-b">
        <div className="flex items-center justify-center h-16">
          <span>Loading...</span>
        </div>
      </header>
    );
  }
  return (
    <>
      <header
        id="top"
        className={`${
          scrolled ? "" : "lg:relative fixed"
        }  duration-300  w-full z-10 border `}
      >
        <a
          href="#top"
          className={`${
            scrolled ? "visible" : "invisible"
          } fixed p-1 text-[20px] sm:p-3 lg:p-4 rounded-full sm:text-[25px] lg:text-[30px] bg-red-500 bottom-10 sm:bottom-20 text-white right-2 sm:right-6 lg:right-10`}
        >
          <MdKeyboardDoubleArrowUp />
        </a>
        <nav
          className={`flex ${
            scrolled ? "fixed top-0" : "top-[3%]"
          } bg-white duration-300  w-full  flex-wrap justify-between  z-[999999] sm:flex-nowrap items-center border-b py-2`}
        >
          <div className=" w-[60px] sm:w-[120px] ps-4">
            <img className="rounded-full" src={logo} alt="" />
          </div>
          <div
            onClick={() => {
              setNev(!showNev);
            }}
            className="block  lg:hidden order-2  pe-4 text-[30px] sm:text-[35px]"
          >
            <IoMenu />
          </div>
          <div className=" sm:w-[55%] w-[45%] lg:w-[30%]">
            <div className="bg-neutral-100 w-full  flex items-center justify-between pe-4 sm:pe-7 rounded">
              <input
                placeholder="Search...."
                className="bg-inherit w-full ps-3 py-2 sm:py-3 focus:outline-none border-0 "
                type="text"
              />
              <div className="text-[20px] tsm:ext-[25px]">
                <IoSearch />
              </div>
            </div>
          </div>
          <div
            className={`${
              showNev ? "end-0" : "end-[-100%] lg:end-0"
            } duration-300   absolute w-[80%]  md:w-[45%]  bg-neutral-200 lg:bg-inherit h-screen lg:h-fit  top-full  lg:relative`}
          >
            <ul className="flex flex-col gap-[60px] mt-9 lg:mt-0 lg:gap-0 lg:flex-row w-full text-[18px] items-center justify-around">
              <li className="hover:underline">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:underline">
                <Link to="#">About Us</Link>
              </li>
              {role === "user" ||
                (role === "student" && (
                  <li className="hover:underline ">
                    <ruby>
                      <Link to="#">Community</Link>
                      <rt className="w-full text-center text-red-400">
                        Comming soon
                      </rt>
                    </ruby>
                  </li>
                ))}

              {role === "teacher" && (
                <li className="hover:underline ">
                  {existUser ? (
                    <Link to={`/teacher/${exitUserId}`}>Teacher</Link>
                  ) : (
                    <Link to="/addTeacher">List as Teacher</Link>
                  )}
                </li>
              )}
              {role === "tutor" ? (
                <li className="hover:underline ">
                  {existUser ? (
                    <Link to={`/tutor/${exitUserId}`}>View Your Tutor</Link>
                  ) : (
                    <Link to="/addTutor">List as Tutor</Link>
                  )}
                </li>
              ) : (
                ""
              )}
              {role === "student" ? (
                <li className="hover:underline ">
                  <Link to={`/student`}>Dashboard</Link>
                </li>
              ) : (
                ""
              )}
              {role === "coching" ? (
                <>
                  <li className="hover:underline ">
                    {existUser ? (
                      <Link to={`/coching/${exitUserId}`}>
                        View Your Coaching
                      </Link>
                    ) : (
                      <Link to="/addCoching">List as Coaching</Link>
                    )}
                  </li>
                  <li className="hover:underline">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                </>
              ) : (
                ""
              )}

              <li className="hover:underline ">
                <Link to="#">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="w-fit lg:pe-5 flex justify-center">
            {user ? (
              <div className="bg-red-500 w-fit group text-neutral-100 relative p-2 rounded-full">
                <FaUser />
                <div className="absolute group-hover:block  hidden  top-full -left-[80px] rounded-lg py-3 px-9 bg-red-500 ">
                  <button>Profile</button>
                  <button onClick={handelLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <>
                <button className="bg-blue-500  flex text-sm sm:text-xs lg:text-base text-white sm:px-3  p-2  sm:py-2 rounded">
                  <Link to="/login">Login</Link>{" "}
                  <span>
                    <Link className="sm:block hidden" to="/signUp">
                      / Sign Up
                    </Link>
                  </span>
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <div className="h-[10vh] sm:h-0 sm:pt-[93px] lg:hidden none"></div>
    </>
  );
}
export default Header;
