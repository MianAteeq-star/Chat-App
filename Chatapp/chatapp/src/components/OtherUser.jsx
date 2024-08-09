import React from "react";

function OtherUser() {
  return (
    <>
      <div className="flex items-center rounded-md hover:bg-zinc-400 shadow-lg">
        <div className="avatar online ">
          <div className="sm:w-14 md:w-24 lg:24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="px-4  sm:text-sm md:text-xl lg:text-2xl">Attique</div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}

export default OtherUser;