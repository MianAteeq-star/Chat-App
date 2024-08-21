import React from "react";
import UserMessage from "./UserMessage";
import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";

function Messages() {
  useGetMessages();
  const { messages } = useSelector((store) => store.message);
  if (!messages) return;
  // console.log(messages.conversation.messages);

  return (
    <>
      <div className="overflow-auto w-full flex-1">
        {messages?.map((message) => {
          return <UserMessage key={message._id} msg={message} />;
        })}
      </div>
    </>
  );
}

export default Messages;
