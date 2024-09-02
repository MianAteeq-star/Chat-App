import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function OtherUser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  console.log(onlineUsers)
  const isOnline = onlineUsers?.includes(user?._id);
  console.log(isOnline)
  const handleSelectedUser = (user) => {
    console.log(user);
    dispatch(setSelectedUser(user));
  };
  return (
    <>
      <div
        onClick={() => handleSelectedUser(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-zinc-400" : ""
        } flex items-center rounded-md hover:bg-zinc-400 shadow-lg p-2 overflow-hidden`}
      >
           <div className={`avatar ${isOnline ? 'online' : '' }`}>
          <div className="w-16 rounded-full">
            <img src={user?.profilePhoto} />
          </div>
        </div>
        <div className="px-4  ">{user?.fullname}</div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}

export default OtherUser;
