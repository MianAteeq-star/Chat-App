import React from "react";
import UserMessage from "./UserMessage";
import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";
import useGetRealTimeMessages from "../hooks/useGetRealTimeMessages";

function Messages() {
  useGetMessages();
  useGetRealTimeMessages()
  const { messages } = useSelector((store) => store.message);
  // if (!messages) return;
  // console.log(messages.conversation.messages);

  return (
    <>
      <div className="overflow-auto  w-full  flex-1">
        {messages && messages?.map((message) => {
          return <UserMessage key={message._id} msg={message} />;
        })}
      </div>
    </>
  );
}

export default Messages;
