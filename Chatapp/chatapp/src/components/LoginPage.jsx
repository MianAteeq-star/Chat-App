import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        user
      );
      console.log(response);
      if (response && response.data.success) {
        console.log(response.data);

        //   // localStorage.setItem("token", response.data.token);
        //   // localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
        console.log(response.data);
        dispatch(setAuthUser(response.data));
        console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setUser({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className="hero  min-h-screen">
        <div className="hero-content flex-col  w-full ">
          <div className="card h-full w-full bg-red-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 max-w-sm shrink-0 shadow-2xl">
            <div className="text-center ">
              <h1 className="text-5xl font-bold text-slate-200">Login Now</h1>
            </div>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-200">Email</span>
                </label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Email"
                  className="input h-10 input-bordered w-full  rounded-lg text-gray-200 placeholder-gray-200 border-gray-200  bg-transparent focus:outline-none focus:ring-transparent focus:border-gray-200 focus:placeholder-transparent focus:text-gray-200"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-200">Password</span>
                </label>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="password"
                  className="input input-bordered w-full mb-3  rounded-lg text-gray-200 placeholder-gray-200 border-gray-200  bg-transparent focus:outline-none focus:ring-transparent focus:border-gray-200 focus:placeholder-transparent focus:text-gray-200"
                  required
                />
                <div className="flex justify-between">
                  <label className="label">
                    <a className="label-text-alt link link-hover text-slate-200">
                      Forgot password?
                    </a>
                  </label>
                  <label className="label">
                    <Link
                      to={"/register"}
                      className="label-text-alt link link-hover no-underline text-slate-200"
                    >
                      SIGN UP
                    </Link>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="relative inline-flex items-center justify-center p-0.5   mx-8 overflow-hidden text-sm font-medium text-neutral-200 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none dark:focus:ring-blue-800">
                  <span className="relative text-lg w-full px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    LOGIN
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
