import React, { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import OtherUsers from "./OtherUsers";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setGetOtherUser } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
 
function Sidebar() {
  const [search , setSearch] = useState("")
  const {otherUsers} = useSelector(store=>store.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const res = await axios.get(`/api/v1/users/logout`);
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/login");
      dispatch(setAuthUser(null))
      dispatch(setMessages(null))
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };

  const handleSearch = async(e)=>{
    e.preventDefault()
    console.log(search)
    console.log(otherUsers)
    const searchedUser = otherUsers?.user?.find((user)=> user.fullname.toLowerCase().includes(search.toLowerCase()));
    console.log(searchedUser)
    if(searchedUser){
      dispatch(setGetOtherUser([searchedUser]));
  }else{
      toast.error("User not found!");
  }
  }
  return (
    <>
      <div className=" w-4/12 sm:2/12 border-r border-slate-500 flex flex-col overflow-auto  cursor-pointer p-2 ">
        <form onSubmit={handleSearch} className=" flex items-center gap-2 sticky top-0 z-30 bg-slate-500 p-2 rounded-md ">
          <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className=" input  input-bordered w-full  rounded-md text-gray-200 placeholder-gray-200 border-gray-200  bg-transparent focus:outline-none focus:ring-transparent focus:border-gray-200 focus:placeholder-transparent focus:text-gray-200"
            required
          />
          <button className="btn btn-square bg-zinc-700 ">
            <VscSearch className="w-3 h-3 outline-none" />
          </button>
        </form>
        <div className="divider  px-3"></div>

        {/* Other Users  */}
        <div>
          <OtherUsers />
        </div>
        <div className="divider  px-3"></div>
        <div onClick={handleLogout} className="fixed bottom-1 left-1 z-30">
          <button className="btn bg-red-500 hover:bg-red-600 border-cyan-500">
            <CiLogout className="h-4  w-4 text-white" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
