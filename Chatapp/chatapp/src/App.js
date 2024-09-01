import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setAuthUser, setOnlineUsers } from "./redux/userSlice";
import { setSocket, setConnectionStatus } from "./redux/socketSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  const { authUser } = useSelector((state) => state.user);
  const { socket, isConnected } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      dispatch(setAuthUser(JSON.parse(storedUser)));
      console.log('User loaded from localStorage:', JSON.parse(storedUser));
    }
  }, [dispatch]);

  useEffect(() => {
    if (authUser?.user && !socket) {
      const newSocket = io("http://localhost:4000",{
        query:{
          userId:authUser?.user?._id
      }}, { transports: ["websocket"] }); // Adjust the URL as needed
      console.log(newSocket)

      newSocket.on("connect", () => {
        console.log(`Connected with socket ID: ${newSocket.id}`);
        dispatch(setConnectionStatus(true));
        newSocket.emit('onlineUsers', authUser.user);
      });

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        console.log('Online users :', onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      })

      newSocket.on("disconnect", () => {
        console.log('Disconnected from socket');
        dispatch(setConnectionStatus(false));
      });

      newSocket.on("connect_error", (err) => {
        console.error("Connection Error:", err.message);
      });

      dispatch(setSocket(newSocket));
    }

    return () => {
      if (socket) {
        socket.disconnect();
        dispatch(setSocket(null));
      }
    };
  }, [authUser, socket, dispatch]);

  useEffect(() => {
    console.log('Socket connection status:', isConnected);
  }, [isConnected]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

  // useEffect(()=>{
  //   if(authUser?.user){
  //     const socketio = io("*", {
  //       query:{
  //         userId:authUser?.user?._id
  //       }
  //   });
  //   dispatch(setSocket(socketio));

  //   socketio?.on('getOnlineUsers', (onlineUsers)=>{
  //     dispatch(setOnlineUsers(onlineUsers))
  //   });
  //   return () => socketio.close();
  //   }else{
  //     if(socket){
  //       socket.close();
  //       dispatch(setSocket(null));
  //     }
  //   }


  // },[authUser?.user]);