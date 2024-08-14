import React, { useContext, useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import { UserContext } from "../components/UserContext";

function StudentModules() {
  const { exitUserDetails, api } = useContext(UserContext);

  const [viewPdf, setViewPdf] = useState(false);

  const [currentPdf, setCurrentPdf] = useState(""); // To store the current PDF file path
  const [module, setModules] = useState([]);

  useEffect(() => {
    const fetchDpps = async (coaching_id, classes) => {
      try {
        const response = await fetch(`${api}/Modules`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coaching_id, classes }),
        });
        const data = await response.json();
        if (data.status) {
          setModules(data.module);
        } else {
          console.log("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (Object.keys(exitUserDetails).length > 0) {
      let { coaching_id } = exitUserDetails;
      let { classes } = exitUserDetails;

      fetchDpps(coaching_id, classes);
    }
  }, [exitUserDetails]);

  return (
    <div>
      <div className="w-[95%] space-y-5 mt-9 sm:w-3/4 m-auto">
        <h4 className="text-center md:text-4xl">Modules</h4>
        {module.map((module, index) => (
          <div
            key={index}
            className="border flex overflow-hidden pe-5 rounded-lg"
          >
            <div className="bg-red-600 over px-2"></div>
            <div className="justify-between flex-wrap w-full flex">
              <div className="py-5 px-4 w-[70%] md:w-fit text-[14px] sm:text-lg">
                Module No. - {index + 1} - {module.module_name}
              </div>
              <div className="flex justify-center md:m-2 w-[30%] md:w-fit gap-9 items-center text-lg">
                <button
                  onClick={() => {
                    setCurrentPdf(module.module_file_path);
                    setViewPdf(true);
                  }}
                  className="flex bg-gray-600 items-center text-white gap-5 px-2 sm:px-4 rounded-lg py-2"
                >
                  <span className="hidden md:block">View</span> <IoEyeOutline />{" "}
                </button>
                <a
                  href={module.module_file_path}
                  download
                  className="flex bg-green-600 items-center text-white gap-5 px-2 sm:px-4 rounded-lg py-2"
                >
                  <span className="hidden md:block">Download</span>{" "}
                  <FaDownload />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewPdf && (
        <div className="fixed top-[10%] left-[50%] transform -translate-x-[50%] duration-300 bg-white max-h-[80vh] h-[80vh] w-[90vh] p-4 shadow-lg rounded-lg">
          <button
            onClick={() => setViewPdf(false)}
            className=" absolute top-2 right-4 px-2 text-4xl text-white"
          >
            &times;
          </button>
          <iframe
            src={currentPdf}
            className="w-full h-full"
            title="PDF Viewer"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default StudentModules;
