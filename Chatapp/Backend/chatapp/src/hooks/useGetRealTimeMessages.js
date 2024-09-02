
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { setMessages } from "../redux/messageSlice";



const useGetRealTimeMessages = () => {
    const {socket } = useSelector((state) => state.socket);
    const {messages } = useSelector((state) => state.message);
    console.log(messages)
const dispatch = useDispatch()

    useEffect(() => {
      socket?.on("getMessageWithSocket", (data) => {
        console.log(data)
       dispatch(setMessages([...messages , data]));
      });
      return () => socket?.off("getMessageWithSocket");
    }, [setMessages,messages]);

}


export default useGetRealTimeMessages;