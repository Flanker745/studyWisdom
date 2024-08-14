import React, { useState, useEffect, useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";

function Tutors() {
  const navigate = useNavigate();
  const { api } = useContext(UserContext);

  const [viewTutors, setTutors] = useState([]);
  const viewData = async () => {
    let responce = await fetch(`${api}/viewTutors`, {
      method: "GET",
      headers: {},
    });
    let data = await responce.json();
    if (data.res) {
      setTutors(data.res);
    } else {
      alert("error");
    }
  };
  useEffect(() => {
    viewData();
  }, []);

  return (
    <div className=" sm:p-5 w-[95%]  xl:w-[85%] m-auto mt-9 flex justify-center sm:justify-start flex-wrap gap-9">
      {viewTutors.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            navigate(`/tutor/${item._id}`);
          }}
          className=" w-[300px]  sm:w-[350px]"
        >
          <div className="border w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-2xl relative overflow-hidden">
            <img
              className="w-full h-full hover:scale-110 duration-500"
              src={item.logo}
              alt=""
            />
            <div className="absolute right-3 top-3 text-2xl">
              <FaHeart className="text-red-500 " />
            </div>
            <div className="absolute bottom-8 text-white text-2xl font-bold ps-5">
              <h3>{item.name}</h3>
              <h3 className="text-sm   font-semibold">
                {item.city}({item.type})
              </h3>
            </div>
          </div>
          <div className="ps-3 text-sm space-y-2 mt-3">
            <div className="flex text-xs items-center  gap-2">
              <span className="bg-green-600 text-white  font-bold  p-1 gap-2 flex items-center rounded">
                4.9 <FaStar />
              </span>
              <div className="text-blue-600 py-1">(10 reviews)</div>
            </div>
            <p>{item.about}</p>
            <div>
              <span>
                ${item.fee}/{(item.feeAs = "perhour" ? "hr" : "month")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tutors;
