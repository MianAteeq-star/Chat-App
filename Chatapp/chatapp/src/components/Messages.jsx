import React from "react";
import UserMessage from "./UserMessage";
import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";

function Messages() {
  useGetMessages();
  const { messages } = useSelector((store) => store.message);

  return (
    <>
      <div className="overflow-auto w-full">
        {
          messages?.map((msg)=)
        }
        <UserMessage />
        <UserMessage />
        <UserMessage />
        <UserMessage />
        <UserMessage />
      </div>
    </>
  );
}

export default Messages;
