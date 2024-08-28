import React, { useContext, useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import { UserContext } from "../components/UserContext";
import { Link } from "react-router-dom";

function StudentVideos() {
  const { exitUserDetails, api } = useContext(UserContext);

  const [video, setvideos] = useState([]);

  useEffect(() => {
    const fetchResults = async (coaching_id, classes) => {
      try {
        const response = await fetch(`${api}/Videos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coaching_id, classes }),
        });
        const data = await response.json();
        if (data.status) {
          setvideos(data.video);
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

      fetchResults(coaching_id, classes);
    }
  }, [exitUserDetails]);

  return (
    <div>
      <div className="w-[95%] space-y-5 mt-9 sm:w-3/4 m-auto">
        <h4 className="text-center md:text-4xl">Videos</h4>
        {video.map((video, index) => (
          <Link to="/student/viewvideos"
          state={{ video_link: video.video_link , video_name : video.video_name , sub:video.subject }}
            key={index}
            className="border flex overflow-hidden pe-5 rounded-lg"
          >
            <div className="bg-red-600 over px-2"></div>
            <div className="justify-between flex-wrap w-full flex">
              <div className="py-5 px-4 w-[70%] md:w-fit text-[14px] sm:text-lg">
                video No. - {index + 1} - {video.video_name}
              </div>
              <div className="flex justify-center md:m-2 w-[30%] md:w-fit gap-9 items-center text-lg">
                <button
                  
                  className="flex bg-gray-600 items-center text-white gap-5 px-2 sm:px-4 rounded-lg py-2"
                >
                  <span className="hidden md:block">View</span> <IoEyeOutline />{" "}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StudentVideos;
