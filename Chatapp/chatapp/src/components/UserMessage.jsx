import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function UserMessage({ msg }) {
  const { authUser, selectedUser } = useSelector((store) => store.user)

  // console.log("Message of prop : ",msg)
  // console.log("selectedUser : ",selectedUser)
  // console.log("authUser : ",authUser)
  const scroll = useRef()
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [msg])
  return (
    <>
      <div ref={scroll} className="p-1  flex-1  w-full ">
        <div className={`chat ${authUser?.user?._id === msg?.senderId ? 'chat-end' : 'chat-start'} `}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={`${msg?.senderId === authUser?.user?._id ? authUser?.user?.profilePhoto : selectedUser?.profilePhoto}`}
              />
            </div>
          </div>
          <div className={`chat-bubble ${msg?.senderId !== authUser?.user._id ? 'bg-gray-200 text-black' : ''} `}>{msg?.message}</div>
          <div className="chat-footer">
                <time className="text-xs opacity-50 text-white">{authUser?.user?._id  === msg?.senderId ?  authUser?.user?.username : selectedUser?.username}</time>
            </div>
        </div>

      </div>



    </>
  );
}

export default UserMessage;
