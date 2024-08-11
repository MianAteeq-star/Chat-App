import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:4000/api/v1/messages/${selectedUser?._id}`
        );
        console.log(res.data);
        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [selectedUser]);
};

export default useGetMessages;
