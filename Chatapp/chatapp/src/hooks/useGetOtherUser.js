import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setGetOtherUser } from "../redux/userSlice";

function useGetOtherUser() {
  const dispath = useDispatch();
  useEffect(() => {
    const GetOtherUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`/api/v1/users/`);
        console.log(res.data.user);
        dispath(setGetOtherUser(res?.data?.user));
      } catch (error) {
        console.error(error);
      }
    };
    GetOtherUser();
  }, []);
}

export default useGetOtherUser;
