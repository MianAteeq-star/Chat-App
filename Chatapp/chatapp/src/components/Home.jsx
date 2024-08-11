import React from "react";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import MessageContainer from "./MessageContainer";

function Home() {
  return (
    <>
      <div className="flex  flex-col sm:flex-row  gap-8 md:gap-5 sm:gap-2 p-5 text-white h-full w-full  sm:w-3/4  bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100  shrink-0 shadow-2xl overflow-hidden">
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  );
}

export default Home;
