import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function StudendViewVideo() {
  const location = useLocation();
  const { video_link, video_name, sub } = location.state || {};

  return (
    <div className="mt-9 px-9">
     <div
            className="border flex overflow-hidden pe-5 lg:w-[70%] m-auto sm:w-[70%] w-full rounded-lg"
          >
            <div className="bg-red-600 over px-2"></div>
            <div className="justify-between capitalize flex-wrap w-full flex">
              <div className="py-5 px-4  md:w-fit text-[14px] sm:text-lg">
                Topic: {video_name}
              </div>
              <div className="py-5 px-4  md:w-fit text-[14px] sm:text-lg">
                Subject: {sub}
              </div>
            </div>
          </div>

      <div className="m-auto mt-9 ">
        <iframe
        className="lg:w-[70%] m-auto lg:h-[700px] sm:w-[80%] sm:h-[500px] w-[100%] h-[400px]"
          src={video_link}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default StudendViewVideo;
