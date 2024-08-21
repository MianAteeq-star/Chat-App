import React from "react";
import { useSelector } from "react-redux";
import SendInput from "./SendInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const {authUser} = useSelector((store) => store.user)
  console.log(authUser)
  return (
    <>
     {
      selectedUser !== null ? (
        <div className="  md:w-[550px] lg:w-2/3   flex flex-1 flex-col items-center  overflow-auto">
        <div className="flex h-16 w-full p-2 items-center rounded-md hover:bg-zinc-400 shadow-lg   bg-slate-700 px-4 py-2 mb-2">
          <div className="avatar online ">
            <div className="sm:w-14 md:w-16 lg:w-16 rounded-full">
              <img src={selectedUser?.profilePhoto}  alt="user_profile"/>
            </div>
          </div>
          <div className="px-4  sm:text-sm md:text-xl lg:text-2xl">
            {selectedUser?.fullname}
          </div>
        </div>

        <div className="divider my-0 py-0 h-1"></div>
        <Messages />
        <SendInput />
      </div>
      ) :(
        <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
        <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.user?.fullname} </h1>
        <h1 className='text-2xl text-white'>Let's start conversation</h1>

    </div>
      )
     }
    </>
  );
};

export default MessageContainer;
