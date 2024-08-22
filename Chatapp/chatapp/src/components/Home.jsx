import React from "react";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import MessageContainer from "./MessageContainer";

function Home() {
  return (
    <>
      <div className="flex    gap-8 md:gap-5 sm:gap-2 p-5 text-white h-full w-full    bg-gray-200 rounded-md  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0 border border-yellow-500  shrink-0 shadow-2xl overflow-hidden">
        
        <Sidebar />

        <MessageContainer />
      </div>
    </>
  );
}


export default Home;
