import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { TbCurrentLocation } from "react-icons/tb";
import { GoChecklist } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";

function Collage() {
  const nav = useNavigate();
  const { api } = useContext(UserContext);

  const [viewCoching, setCoching] = useState([]);
  const viewData = async () => {
    let responce = await fetch(`${api}/viewcochings`, {
      method: "GET",
      headers: {},
    });
    let data = await responce.json();
    if (data.res) {
      setCoching(data.res);
    } else {
      alert("error");
    }
  };
  useEffect(() => {
    viewData();
  }, []);
  return (
    <div className="space-y-5 w-[95%]  xl:w-[85%] my-9 m-auto">
      {viewCoching.map((item, index) => (
        <div
          onClick={() => {
            nav(`/coching/${item._id}`);
          }}
          key={index}
          className="border-2 hover:scale-[1.02] duration-300 rounded-lg bg-white border-neutral-200 py-3 hover:shadow-2xl"
        >
          <div className="px-4">
            <div>
              <h5 className="font-semibold text-xl pb-5">{item.name}</h5>
            </div>
            <div className="flex gap-9">
              <div className="sm:min-w-[200px] hidden lg:block min-w-[150px] h-[150px] sm:h-[200px]">
                <img
                  className="rounded-lg w-full h-full"
                  src={item.logo}
                  alt=""
                />
              </div>
              <div className="text-sm w-full space-y-2 sm:space-y-5">
                <div className="">
                  <div className="flex gap-5 sm:gap-9 ">
                    <div className="sm:min-w-[200px]  lg:hidden min-w-[100px] h-[100px] sm:h-[200px]">
                      <img
                        className="rounded-lg w-full h-full"
                        src={item.logo}
                        alt=""
                      />
                    </div>

                    <div className="space-y-2 sm:space-y-5 ">
                      <div className="flex flex-wrap gap-3 sm:gap-9">
                        <div className="flex  items-center  gap-2">
                          <span className="bg-green-600 text-white font-bold px-2 py-1 gap-2 flex items-center rounded">
                            {item.rating} <FaStar />
                          </span>
                          <div className="text-blue-600 py-1">
                            ({item.reviews} reviews)
                          </div>
                        </div>

                        <div>
                          <span className="flex gap-2 text-neutral-500 py-1 items-center text-sm">
                            <TbCurrentLocation /> {item.city} , {item.state}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap text-[12px] sm:text-lg gap-3 sm:gap-9">
                        <div className="flex gap-2">
                          <GoChecklist className="text-xl mt-1 text-blue-600" />
                          <div>
                            {item.classFrom}th - {item.classTo} th
                            <h6 className="text-sm mt-[-4px]">class</h6>
                          </div>
                        </div>
                        {item.science.map((subject, index) => (
                          <div key={index} className="flex gap-2 ">
                            <GoChecklist className="text-xl mt-1 text-blue-600" />
                            <div>
                              <div className="uppercase">{subject}</div>
                              <h6 className="text-sm mt-[-4px]">Science</h6>
                            </div>
                          </div>
                        ))}
                        {item.arts.map((subject, index) => (
                          <div key={index} className="flex gap-2 ">
                            <GoChecklist className="text-xl mt-1 text-blue-600" />
                            <div>
                              <div className="uppercase">{subject}</div>
                              <h6 className="text-sm mt-[-4px]">Arts</h6>
                            </div>
                          </div>
                        ))}
                        {item.commerce.map((subject, index) => (
                          <div key={index} className="flex gap-2 ">
                            <GoChecklist className="text-xl mt-1 text-blue-600" />
                            <div>
                              <div className="uppercase">{subject}</div>
                              <h6 className="text-sm mt-[-4px]">Commerce</h6>
                            </div>
                          </div>
                        ))}
                        {item.exams.map((subject, index) => (
                          <div key={index} className="flex gap-2 ">
                            <GoChecklist className="text-xl mt-1 text-blue-600" />
                            <div>
                              <div className="uppercase">{subject}</div>
                              <h6 className="text-sm mt-[-4px]">Exam</h6>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-3/4">
                  <p className="text-xs sm:text-base">{item.about}</p>
                  <a className="text-blue-600 font-semibold underline" href="#">
                    Read More
                  </a>
                </div>
                <div className="flex gap-4 flex-wrap items-center justify-end  sm:justify-between">
                  <div className="bg-purple-400 w-full  sm:w-fit flex overflow-hidden text-white items-center  rounded-md">
                    <div className="px-3 sm:px-6 bg-purple-300 py-2">
                      <img
                        className="min-w-[60px]"
                        src="https://static.collegedekho.com/static-up/images/college_listing/studentshortlist.abdd76537ce1.svg"
                        alt=""
                      />
                    </div>
                    <p className="px-3 sm:px-6">
                      Favourite of {item.fav}+ students
                    </p>
                  </div>
                  <button
                    onClick={() => handleWishlistToggle(index)}
                    className="flex  gap-4 items-center text-xl"
                  >
                    <h5>Wishlist </h5>
                    {item.wishlist ? (
                      <FaHeart className="text-[25px]  text-red-500" />
                    ) : (
                      <FaRegHeart className="text-[25px] " />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around sm:justify-end gap-3 sm:gap-5 mt-9 px-2 sm:px-5 py-5 border-t">
            <button className="bg-blue-500 px-2 sm:px-5 py-2 rounded-md text-sm sm:text-lg text-white">
              Book a Demo Class
            </button>
            <button className="border-2 border-blue-500 text-blue-500 px-2 sm:px-5 py-2 rounded-md text-sm sm:text-lg">
              Download Brochure
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Collage;
