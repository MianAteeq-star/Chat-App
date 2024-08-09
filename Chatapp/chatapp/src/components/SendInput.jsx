import React from "react";
import { IoSend } from "react-icons/io5";

function SendInput() {
  return (
    <form className=" flex items-center gap-2 w-full">
      <input
        type="text"
        placeholder="Type here"
        className=" relative input input-bordered  w-full max-w-full"
      />
      <button className=" absolute end-7 ">
        <IoSend />
      </button>
    </form>
  );
}

export default SendInput;
