import React, { useContext, useEffect, useState } from "react";
import FAQ from "/src/components/FAQ";
import Carrer from "/src/components/Carrer";
import { LuSchool } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { TbCurrentLocation } from "react-icons/tb";
import { GoChecklist } from "react-icons/go";
import { useParams } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

function Coching() {
  const nav = useNavigate();
  const { id } = useParams();
  const { api } = useContext(UserContext);
  const user_id = decodeURIComponent(cookie.load("id"));
  const [demo, setDemo] = useState(false);
  const [cochingData, setCochingData] = useState({});
  const [coching_id , setCoching_id] = useState("");
  const [message , setMessage] = useState("")
  const [errorMsg , setErrorMsg] = useState("")
  const handleDemoClass = async(e)=>{
    e.preventDefault()
    const form = e.target;
    if (message=="") return setErrorMsg("Message is required.") 
      if (!message=="") setErrorMsg("") 
        const formData = {message , coching_id , user_id }

    try {
      let response = await fetch(`${api}/bookDemoClass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Handle success
        form.reset();
      } else {
        // Handle server errors
        console.log("Server error:", response.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const getData = async () => {
    let responce = await fetch(`${api}/viewCoching/${id}`, {
      method: "GET",
      headers: {},
    });
    let data = await responce.json();
    setCochingData(data.res);
    setCoching_id(data.res._id)
  };
  const handleDemo = () => {
    console.log(cochingData._id, user_id);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className=" bg-neutral-50 space-y-5 py-2 relative">
        <div
          className={`absolute ${
            demo ? "top-[50%]" : "-top-full"
          } translate-y-[-50%] duration-300 translate-x-[-50%] rounded overflow-hidden  left-[50%] z-[9999999] w-[650px] h-[430px] bg-gray-300`}
        >
          <div className="text-end">
            <button
              onClick={() => {
                setDemo(false);
              }}
              className=" p-2 text-2xl "
            >
              <IoMdClose />
            </button>
          </div>
          <div>
            <form onSubmit={handleDemoClass}
              className="w-[90%] m-auto mt-2 rounded-lg p-2 border-2 border-slate-500"
              action=""
            >
              {/* <input type="hidden" name="coching_id" value={coching_id} />
              <input type="hidden" name="user_id" value={user_id} /> */}
              <textarea
                placeholder="Message "
                className="w-full py-1 px-2 bg-transparent text-black rounded-md focus:outline-none"
                rows={12}
                name="message"
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}}
                id=""
              ></textarea>
              <div className="text-end">
                <button 
                  className="bg-blue-500  w-fit px-2 lg:px-5 py-2 rounded-md text-sm sm:text-lg text-white"
                  type="submit"
                >
                  Book
                </button>
                {errorMsg && (
              <p className="text-red-500 text-sm">{errorMsg}</p>
            )}
              </div>
            </form>
          </div>
        </div>
        <div className="sm:w-[90%] w-[95%] border-2 p-2 sm:p-5 rounded-lg my-4 m-auto ">
          <div className="flex flex-wrap items-center space-y-9 md:space-y-0">
            <div className="xl:w-1/2 w-full md:w-[65%] xl:pe-9">
              <div className="text-[22px] lg:text-[30px] xl:text-[40px]">
                <div className="flex  justify-between items-center">
                  <LuSchool className="text-[40px] xl:text-[50px]" />
                  <FaRegHeart className="text-[25px] " />
                </div>
                <h5 className="p-2 capitalize xl:w-[85%]">
                  {cochingData.name} -Admission 2024, Fees, Subject, Ranking
                </h5>
              </div>
              <div className="space-y-2 sm:space-y-5 ">
                <div className="flex flex-wrap gap-3 sm:gap-[150px]">
                  <div className="flex  items-center  gap-2">
                    <span className="bg-green-600 text-white font-bold px-2 py-1 gap-2 flex items-center rounded">
                      {cochingData.rating} <FaStar />
                    </span>
                    <div className="text-blue-600 text-sm lg:text-base  py-1">
                      ({cochingData.reviews} reviews)
                    </div>
                  </div>

                  <div>
                    <span className="flex gap-2 text-neutral-500 py-1 items-center text-sm">
                      <TbCurrentLocation /> {cochingData.city} ,{" "}
                      {cochingData.state}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap text-[12px] sm:text-lg gap-3 sm:gap-9">
                  <div className="flex gap-2">
                    <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
                    <div>
                      {cochingData.classFrom}th - {cochingData.classTo}th
                      <h6 className="text-sm mt-[-4px]">class</h6>
                    </div>
                  </div>
                  {cochingData.exams &&
                    cochingData.exams.map((hobby, index) => (
                      <div key={index} className="flex  gap-2 ">
                        <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
                        <div className="uppercase">
                          {hobby}
                          <h6 className="text-sm mt-[-4px]">Exam</h6>
                        </div>
                      </div>
                    ))}
                  {cochingData.science &&
                    cochingData.science.map((hobby, index) => (
                      <div key={index} className="flex  gap-2 ">
                        <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
                        <div className="uppercase">
                          {hobby}
                          <h6 className="text-sm mt-[-4px]">Exam</h6>
                        </div>
                      </div>
                    ))}
                  {cochingData.arts &&
                    cochingData.arts.map((hobby, index) => (
                      <div key={index} className="flex  gap-2 ">
                        <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
                        <div className="uppercase">
                          {hobby}
                          <h6 className="text-sm mt-[-4px]">Exam</h6>
                        </div>
                      </div>
                    ))}
                  {cochingData.commerce &&
                    cochingData.commerce.map((hobby, index) => (
                      <div key={index} className="flex  gap-2 ">
                        <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
                        <div className="uppercase">
                          {hobby}
                          <h6 className="text-sm mt-[-4px]">Exam</h6>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="xl:[85%] text-sm lg:text-md">
                  <p>{cochingData.about}</p>
                </div>
              </div>
              <div className=" gap-4 mt-4  flex-wrap items-center justify-end  sm:justify-between">
                <div className=" flex gap-5 mt-9">
                  <button
                    onClick={() => {
                      if (user_id !== "undefined") {
                        setDemo(!demo);
                      } else {
                        nav("/login");
                      }
                    }}
                    className="bg-blue-500 w-fit px-2 lg:px-5 py-2 rounded-md text-sm sm:text-lg text-white"
                  >
                    Book a Demo Class
                  </button>
                  <button className="border-2 w-fit border-blue-500 text-blue-500 px-2 lg:px-5 py-2 rounded-md text-sm sm:text-lg">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
            <div className="xl:w-1/2 ps-3 flex w-full items-center justify-center md:w-[34%] lg:w-[35%]">
              <div className="xl:w-[500px] lg:w-[400px] w-[350px] h-[250px] lg:h-[300px] xl:h-[350px] rounded-lg overflow-hidden">
                <img className="w-full h-full" src={cochingData.logo} alt="" />
              </div>
            </div>
          </div>
          <FAQ />
          <Carrer />
        </div>
      </div>
    </>
  );
}

export default Coching;
