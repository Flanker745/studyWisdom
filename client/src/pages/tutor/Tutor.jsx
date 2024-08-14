import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import FAQ from "/src/components/FAQ";
import { GoChecklist } from "react-icons/go";
import { useParams } from "react-router-dom";
import { UserContext } from "../../components/UserContext";

function Tutor() {
  const { id } = useParams();
  const { api } = useContext(UserContext);
  const [TutorData, setTutorData] = useState({});
  const getData = async () => {
    let responce = await fetch(`${api}/viewTutors/${id}`, {
      method: "GET",
      headers: {},
    });
    let data = await responce.json();
    setTutorData(data.res);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className=" bg-neutral-50 space-y-9 py-2">
        <div className="sm:w-[90%] w-[95%] border-2 p-2 sm:p-5 rounded-lg my-4 m-auto ">
          <div className="flex flex-wrap items-center space-y-9 md:space-y-0">
            <div className="xl:w-1/2 order-2 md:order-1 mt-5 sm:mt-0 w-full md:w-[65%] space-y-6 xl:pe-9">
              <div className="text-[22px] lg:text-[30px] xl:text-[40px]">
                <div className="flex  justify-between items-center">
                  <h3 className="text-2xl capitalize">{TutorData.name}</h3>
                  <FaRegHeart className="text-[25px] " />
                </div>
                <h5 className="p-2 text-base sm:text-lg capitalize xl:w-[85%]">
                  {TutorData.about}
                </h5>
                <div className="flex items-center flex-wrap gap-3 text-xs sm:gap-9">
                  <div className="flex  items-center  gap-2">
                    <span className="bg-green-600 text-white  font-bold px-2 py-1 gap-2 flex items-center rounded">
                      <FaStar />
                    </span>
                    <div className="text-blue-600  text-sm  py-1">
                      (reviews)
                    </div>
                  </div>
                  <div>
                    {TutorData.address && (
                      <div className="text-sm">
                        {TutorData.address} ,{" "}
                        <span className="capitalize">{TutorData.city} </span>,{" "}
                        <span className="capitalize">{TutorData.state}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl my-3  ">Skills</h4>
                <div className="flex flex-wrap gap-4">
                  {TutorData.area == "education" ? (
                    <>
                      {
                        <div className="flex gap-2">
                          <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
                          <div className="sm:text-xl">
                            {TutorData.classFrom}th - {TutorData.classTo}th
                            <h6 className="text-sm mt-[-4px]">class</h6>
                          </div>
                        </div>
                      }
                      {TutorData.science.map((item, index) => (
                        <div
                          key={index}
                          className="flex uppercase sm:text-xl gap-2"
                        >
                          <GoChecklist className="lg:text-xl mt-1 text-blue-600" />{" "}
                          {item}
                        </div>
                      ))}
                      {TutorData.arts.map((item, index) => (
                        <div
                          key={index}
                          className="flex uppercase sm:text-xl gap-2"
                        >
                          <GoChecklist className="lg:text-xl mt-1 text-blue-600" />{" "}
                          {item}
                        </div>
                      ))}
                      {TutorData.commerce.map((item, index) => (
                        <div
                          key={index}
                          className="flex uppercase sm:text-xl gap-2"
                        >
                          <GoChecklist className="lg:text-xl mt-1 text-blue-600" />{" "}
                          {item}
                        </div>
                      ))}
                      {TutorData.exams.map((item, index) => (
                        <div
                          key={index}
                          className="flex uppercase sm:text-xl gap-2"
                        >
                          <GoChecklist className="lg:text-xl mt-1 text-blue-600" />{" "}
                          {item}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="flex uppercase sm:text-xl gap-2">
                      <GoChecklist className="lg:text-xl mt-1 text-blue-600" />{" "}
                      {TutorData.skills}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-8 flex-wrap">
                <div>
                  <h4 className="text-2xl my-3 ">Fee</h4>
                  <div className="">
                    ${TutorData.fee}/
                    {(TutorData.feeAs = "perhour" ? "hr" : "month")}
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl my-3 ">Location</h4>
                  <div className="capitalize">{TutorData.type}</div>
                </div>
                <div>
                  <h4 className="text-2xl my-3 ">Language</h4>
                  <div className="capitalize">
                    {TutorData.language == "regional"
                      ? TutorData.regionalLanguage
                      : TutorData.language}{" "}
                  </div>
                </div>
              </div>
              <div className=" gap-4 mt-4 flex flex-wrap items-center justify-end  sm:justify-between">
                <div className="bg-purple-400 w-full  sm:w-fit flex overflow-hidden text-white items-center  rounded-md">
                  <div className="px-3 sm:px-6 bg-purple-300 py-2">
                    <img
                      className="min-w-[60px]"
                      src="https://static.collegedekho.com/static-up/images/college_listing/studentshortlist.abdd76537ce1.svg"
                      alt=""
                    />
                  </div>
                  <p className="px-3 sm:px-6">Favourite of 123+ students</p>
                </div>
                <button className="bg-blue-500 w-fit px-2 lg:px-5 py-2 rounded-md text-sm sm:text-lg text-white">
                  Book a Demo Class
                </button>
              </div>
            </div>
            <div className="xl:w-1/2 ps-3 order-1 md:order-2 flex w-full items-center justify-center md:w-[34%] lg:w-[35%]">
              <div className="xl:w-[500px] lg:w-[400px] w-[350px] h-[250px] lg:h-[300px] xl:h-[350px] rounded-lg overflow-hidden">
                <img className="w-full h-full" src={TutorData.logo} alt="" />
              </div>
            </div>
          </div>
          <FAQ />
        </div>
      </div>
    </>
  );
}

export default Tutor;

// import React, { useEffect, useState } from "react";
// import FAQ from "./components/FAQ";
// import Carrer from "./components/Carrer";
// import { LuSchool } from "react-icons/lu";
// import { FaRegHeart } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
// import { TbCurrentLocation } from "react-icons/tb";
// import { GoChecklist } from "react-icons/go";
// import { useParams } from "react-router-dom";

// function Coching() {
//   const { id } = useParams();

//   const [cochingData, setCochingData] = useState({});
//   const getData = async () => {
//     let responce = await fetch(`http://localhost:5500/viewCoching/${id}`, {
//       method: "GET",
//       headers: {},
//     });
//     let data = await responce.json();
//     setCochingData(data.res);
//   };
//   useEffect(() => {
//     getData();
//   }, []);
//   return (
//     <>
//       <div className=" bg-neutral-50 space-y-5 py-2">
//         <div className="sm:w-[90%] w-[95%] border-2 p-2 sm:p-5 rounded-lg my-4 m-auto ">
//           <div className="flex flex-wrap items-center space-y-9 md:space-y-0">
//             <div className="xl:w-1/2 w-full md:w-[65%] xl:pe-9">
//               <div className="text-[22px] lg:text-[30px] xl:text-[40px]">
//                 <div className="flex  justify-between items-center">
//                   <LuSchool className="text-[40px] xl:text-[50px]" />
//                   <FaRegHeart className="text-[25px] " />
//                 </div>
//                 <h5 className="p-2 capitalize xl:w-[85%]">
//                   {cochingData.name} -Admission 2024, Fees, Subject, Ranking
//                 </h5>
//               </div>
//               <div className="space-y-2 sm:space-y-5 ">
//                 <div className="flex flex-wrap gap-3 sm:gap-[150px]">
//                   <div className="flex  items-center  gap-2">
//                     <span className="bg-green-600 text-white font-bold px-2 py-1 gap-2 flex items-center rounded">
//                       {cochingData.rating} <FaStar />
//                     </span>
//                     <div className="text-blue-600 text-sm lg:text-base  py-1">
//                       ({cochingData.reviews} reviews)
//                     </div>
//                   </div>

//                   <div>
//                     <span className="flex gap-2 text-neutral-500 py-1 items-center text-sm">
//                       <TbCurrentLocation /> {cochingData.city} ,{" "}
//                       {cochingData.state}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex flex-wrap text-[12px] sm:text-lg gap-3 sm:gap-9">
//                   <div className="flex gap-2">
//                     <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
//                     <div>
//                       {cochingData.classFrom}th - {cochingData.classTo}th
//                       <h6 className="text-sm mt-[-4px]">class</h6>
//                     </div>
//                   </div>
//                   {cochingData.exams &&
//                     cochingData.exams.map((hobby, index) => (
//                       <div key={index} className="flex  gap-2 ">
//                         <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
//                         <div className="uppercase">
//                           {hobby}
//                           <h6 className="text-sm mt-[-4px]">Exam</h6>
//                         </div>
//                       </div>
//                     ))}
//                     {cochingData.science &&
//                     cochingData.science.map((hobby, index) => (
//                       <div key={index} className="flex  gap-2 ">
//                         <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
//                         <div className="uppercase">
//                           {hobby}
//                           <h6 className="text-sm mt-[-4px]">Exam</h6>
//                         </div>
//                       </div>
//                     ))}
//                     {cochingData.arts &&
//                     cochingData.arts.map((hobby, index) => (
//                       <div key={index} className="flex  gap-2 ">
//                         <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
//                         <div className="uppercase">
//                           {hobby}
//                           <h6 className="text-sm mt-[-4px]">Exam</h6>
//                         </div>
//                       </div>
//                     ))}
//                     {cochingData.commerce &&
//                     cochingData.commerce.map((hobby, index) => (
//                       <div key={index} className="flex  gap-2 ">
//                         <GoChecklist className="lg:text-xl mt-1 text-blue-600" />
//                         <div className="uppercase">
//                           {hobby}
//                           <h6 className="text-sm mt-[-4px]">Exam</h6>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//                 <div className="xl:[85%] text-sm lg:text-md">
//                   <p>{cochingData.about}</p>
//                 </div>
//               </div>
//               <div className=" gap-4 mt-4  flex-wrap items-center justify-end  sm:justify-between">
//                 <div className="bg-purple-400 w-full  sm:w-fit flex overflow-hidden text-white items-center  rounded-md">
//                   <div className="px-3 sm:px-6 bg-purple-300 py-2">
//                     <img
//                       className="min-w-[60px]"
//                       src="https://static.collegedekho.com/static-up/images/college_listing/studentshortlist.abdd76537ce1.svg"
//                       alt=""
//                     />
//                   </div>
//                   <p className="px-3 sm:px-6">
//                     Favourite of {cochingData.fav}+ students
//                   </p>
//                 </div>
//                 <div className=" flex gap-5 mt-9">
//                   <button className="bg-blue-500 w-fit px-2 lg:px-5 py-2 rounded-md text-sm sm:text-lg text-white">
//                     Book a Demo Class
//                   </button>
//                   <button className="border-2 w-fit border-blue-500 text-blue-500 px-2 lg:px-5 py-2 rounded-md text-sm sm:text-lg">
//                     Download Brochure
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="xl:w-1/2 ps-3 flex w-full items-center justify-center md:w-[34%] lg:w-[35%]">
//               <div className="xl:w-[500px] lg:w-[400px] w-[350px] h-[250px] lg:h-[300px] xl:h-[350px] rounded-lg overflow-hidden">
//                 <img className="w-full h-full" src={cochingData.logo} alt="" />
//               </div>
//             </div>
//           </div>
//           <FAQ />
//           <Carrer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Coching;
