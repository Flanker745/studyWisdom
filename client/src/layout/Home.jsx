import React, { useEffect, useState } from "react";
import Hero from "/src/components/Hero";
import { Link, Outlet } from "react-router-dom";

import Carrer from "/src/components/Carrer";
import FAQ from "/src/components/FAQ";
function Home() {
  return (
    <>
      <div className=" bg-neutral-50 space-y-5 py-2">
        <div className="w-[95%] m-auto ">
          <Hero />
          <div className="flex flex-wrap  sm:justify-end gap-5 sm:gap-9 *:py-3 *sm:pt-9 ">
            <Link to={"/"}>Coachings</Link>
            <Link to={"/tutors"}>Tutor</Link>
            <Link to={"/teachers"}>Looking for a Teacher ?</Link>
          </div>
          <Outlet />
          <FAQ />
          <Carrer />
        </div>
      </div>
    </>
  );
}

export default Home;
