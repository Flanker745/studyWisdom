import React, { useContext, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { PiStudentFill } from "react-icons/pi";
import { GrNotes } from "react-icons/gr";
import { VscFileSubmodule } from "react-icons/vsc";
import { GoGoal } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { MdOutlineOndemandVideo } from "react-icons/md";

function Dashboard() {
  const { exitUserId, api } = useContext(UserContext);

  const [count, setCount] = useState({});
  const fetchData = async (id) => {
    try {
      let responce = await fetch(`${api}/dashboard/${id}`);
      responce = await responce.json();
      setCount(responce);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (exitUserId) {
      let id = exitUserId;
      fetchData(id);
    }
  }, [exitUserId]);
  return (
    <>
      <div className="flex px-9 mt-16 flex-wrap -mx-3">
        <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6 group">
          <div className="bg-blue-500 overflow-hidden rounded-lg shadow-md">
            <div className="flex items-center p-4 justify-between">
              <div className="text-white ">
                <h3 className="text-3xl font-bold">{count.student}</h3>
                <p className="mt-2">Total Students</p>
              </div>
              <div className="text-blue-100">
                <PiStudentFill className="text-6xl group-hover:scale-110 duration-300" />
              </div>
            </div>
            <div className="bg-blue-600 px-4 py-3 ">
              <Link
                to="/dashboard/viewStudent"
                className="text-blue-100  hover:text-white   inline-block"
              >
                More info{" "}
                <GrFormNextLink className="inline text-[20px]  ms-4 text-blue-500 rounded-full  bg-white " />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6 group">
          <div className="bg-green-500 overflow-hidden rounded-lg shadow-md">
            <div className="flex items-center p-4 justify-between">
              <div className="text-white ">
                <h3 className="text-3xl font-bold">{count.notes}</h3>
                <p className="mt-2">Total Notes</p>
              </div>
              <div className="text-green-100">
                <GrNotes className="text-5xl group-hover:scale-110 duration-300" />
              </div>
            </div>
            <div className="bg-green-600 px-4 py-3 ">
              <Link
                to="/dashboard/viewNotes"
                className="text-green-100  hover:text-white   inline-block"
              >
                More info{" "}
                <GrFormNextLink className="inline text-[20px] ms-4 text-green-500 rounded-full  bg-white " />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6 group">
          <div className="bg-sky-500 overflow-hidden rounded-lg shadow-md">
            <div className="flex items-center p-4 justify-between">
              <div className="text-white ">
                <h3 className="text-3xl font-bold">{count.modules}</h3>
                <p className="mt-2">Total Modules</p>
              </div>
              <div className="text-sky-100">
                <VscFileSubmodule className="text-5xl group-hover:scale-110 duration-300" />
              </div>
            </div>
            <div className="bg-sky-600 px-4 py-3 ">
              <Link
                to="/dashboard/viewModules"
                className="text-sky-100  hover:text-white   inline-block"
              >
                More info{" "}
                <GrFormNextLink className="inline text-[20px] ms-4 text-sky-500 rounded-full  bg-white " />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6 group">
          <div className="bg-red-500 overflow-hidden rounded-lg shadow-md">
            <div className="flex items-center p-4 justify-between">
              <div className="text-white ">
                <h3 className="text-3xl font-bold">{count.dpps}</h3>
                <p className="mt-2">Total Dpp</p>
              </div>
              <div className="text-red-100">
                <GoGoal className="text-5xl group-hover:scale-110 duration-300" />
              </div>
            </div>
            <div className="bg-red-600 px-4 py-3 ">
              <Link
                to="/dashboard/viewDpp"
                className="text-red-100  hover:text-white   inline-block"
              >
                More info{" "}
                <GrFormNextLink className="inline text-[20px] ms-4 text-red-500 rounded-full  bg-white " />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6 group">
          <div className="bg-pink-500 overflow-hidden rounded-lg shadow-md">
            <div className="flex items-center p-4 justify-between">
              <div className="text-white ">
                <h3 className="text-3xl font-bold">{count.results}</h3>
                <p className="mt-2">Total Results</p>
              </div>
              <div className="text-pink-100">
                <IoNewspaperOutline className="text-5xl group-hover:scale-110 duration-300" />
              </div>
            </div>
            <div className="bg-pink-600 px-4 py-3 ">
              <Link
                to="/dashboard/viewResults"
                className="text-pink-100  hover:text-white   inline-block"
              >
                More info{" "}
                <GrFormNextLink className="inline text-[20px] ms-4 text-pink-500 rounded-full  bg-white " />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6 group">
          <div className="bg-gray-500 overflow-hidden rounded-lg shadow-md">
            <div className="flex items-center p-4 justify-between">
              <div className="text-white ">
                <h3 className="text-3xl font-bold">{count.video}</h3>
                <p className="mt-2">Total Videos</p>
              </div>
              <div className="text-pink-100">
                <MdOutlineOndemandVideo className="text-5xl group-hover:scale-110 duration-300" />
              </div>
            </div>
            <div className="bg-gray-600 px-4 py-3 ">
              <Link
                to="/dashboard/viewVideos"
                className="text-pink-100  hover:text-white   inline-block"
              >
                More info{" "}
                <GrFormNextLink className="inline text-[20px] ms-4 text-pink-500 rounded-full  bg-white " />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
