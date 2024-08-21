import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const SendInput=()=> {
  const [message,setMessage] = useState("")
  const dispatch = useDispatch()
  const {selectedUser} = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message);
  console.log(messages)


  const handleInputSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`http://localhost:4000/api/v1/messages/send/${selectedUser?._id}`, {message}, {
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        console.log(messages)
  
        dispatch(setMessages([...messages, res?.data?.newMessage]))
      
    } catch (error) {
        console.log(error);
    } 
    setMessage("");
}


  return (
    <>
    <form onSubmit={handleInputSubmit} className=" flex items-center gap-2 w-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type here"
        className=" relative input input-bordered  w-full max-w-full"
        />
      <button type="submit" className=" absolute end-7 ">
        <IoSend />
      </button>
    </form>
   
            </>
  );
}

export default SendInput;
