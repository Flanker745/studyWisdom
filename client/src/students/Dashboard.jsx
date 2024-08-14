import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";

function Dashboard() {
  return (
    <div className="flex bg-[rgb(241_245_249)] h-screen overflow-hidden">
      <Navbar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header />
        <div>main</div>
      </div>
    </div>
  );
}

export default Dashboard;
