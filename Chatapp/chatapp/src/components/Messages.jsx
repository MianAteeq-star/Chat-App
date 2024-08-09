import React from "react";
import SendInput from "./SendInput";
import UserMessage from "./UserMessage";

function Messages() {
  return (
    <>
      <div className="  md:w-[550px] lg:w-2/3  flex flex-col items-center ">
        <div className="flex h-16 w-full p-2 items-center rounded-md hover:bg-zinc-400 shadow-lg   bg-slate-700 px-4 py-2 mb-2">
          <div className="avatar online ">
            <div className="sm:w-14 md:w-16 lg:w-16 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="px-4  sm:text-sm md:text-xl lg:text-2xl">Attique</div>
        </div>
        <div className="divider my-0 py-0 h-1"></div>
        <UserMessage />
        <SendInput />
      </div>
    </>
  );
}

export default Messages;
