import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser,onlineUsers } = useSelector((store) => store.user);
  const {authUser} = useSelector((store) => store.user)
  // const isOnline = onlineUsers?.includes(authUser?.user?._id);
  const dispatch = useDispatch()
  console.log(authUser)
  useEffect(()=>{
 return ()=>{dispatch(setSelectedUser(null))}
  },[])
  return (
    <>
     {
      selectedUser !== null ? (
        <div className="  sm:w-[550px]  flex  flex-1 flex-col items-center  overflow-auto">
        <div className="flex h-16 w-full p-3 items-center sticky top-0 z-30 rounded-md hover:bg-zinc-400 shadow-lg   bg-slate-700 px-4 py-2 mb-2">
          <div className="avatar   ">
            <div className="w-14 rounded-full">
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
        <div className=' w-screen  flex flex-col justify-center items-center'>
        <h1 className='sm:text-4xl text-lg text-white font-bold  '>Hi,{authUser?.user?.fullname} </h1>
        <h1 className='text-2xl text-white'>Let's start conversation</h1>

    </div>
      )
     }
    </>
  );
};

export default MessageContainer;
