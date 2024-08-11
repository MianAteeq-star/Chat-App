import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUser from "../hooks/useGetOtherUser";
import { useSelector } from "react-redux";

function OtherUsers() {
  // custom hook
  useGetOtherUser();
  const { otherUsers } = useSelector((store) => store.user);
  // console.log(otherUsers);
  if (!otherUsers) return; // early return

  return (
    <>
      <div className="overflow-auto">
        {otherUsers?.user.map((user) => {
          return <OtherUser key={user._id} user={user} />;
        })}
      </div>
    </>
  );
}

export default OtherUsers;
