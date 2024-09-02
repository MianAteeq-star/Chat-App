import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function RegisterPage() {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${window.location.origin}/api/v1/users/register`,
        user
      );
      if (response && response.data.success) {
        toast.success(response.data && response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setUser({
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <>
      <div className="hero bg-base-200 h-screen  flex justify-center items-center ">
        <div className="hero-content h-96 flex-col flex justify-center items-center w-full m-4">
          <div className="card   bg-red-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 w-full max-w-sm shadow-2xl text-center">
            <div className="text-center ">
              <h1 className="text-3xl font-bold text-slate-200">
                Register Now
              </h1>
            </div>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="label">
                      <span className="label-text text-slate-200">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={user.fullname}
                      onChange={(e) =>
                        setUser({ ...user, fullname: e.target.value })
                      }
                      placeholder="Full Name"
                      className="input h-10 input-bordered w-full  rounded-lg text-gray-200 placeholder-gray-200 border-gray-200  bg-transparent focus:outline-none focus:ring-transparent focus:border-gray-200 focus:placeholder-transparent focus:text-gray-200"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="label">
                      <span className="label-text text-slate-200">
                        User Name
                      </span>
                    </label>
                    <input
                      type="text"
                      value={user.username}
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                      placeholder="Username"
                      className="input h-10 input-bordered w-full  rounded-lg text-gray-200 placeholder-gray-200 border-gray-200  bg-transparent focus:outline-none focus:ring-transparent focus:border-gray-200 focus:placeholder-transparent focus:text-gray-200"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-control">
                <div className="flex space-x-4">
                  <div className="w-3/4">
                    <label className="label">
                      <span className="label-text text-slate-200">Email</span>
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      placeholder="Email"
                      className="input h-10 input-bordered w-full  rounded-lg text-gray-200 placeholder-gray-200 border-gray-200  bg-transparent focus:outline-none focus:ring-transparent focus:border-gray-200 focus:placeholder-transparent focus:text-gray-200"
                      required
                    />
                  </div>
                  <div className="w-1/3">
                    <label className="label">
                      <span className="label-text text-slate-200">Gender</span>
                    </label>
                    <select
                      id="gender"
                      value={user.gender}
                      defaultValue={"male"}
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                      className="input h-10 input-bordered w-full rounded-lg text-white placeholder-gray-400 border-gray-200 bg-transparent focus:outline-none focus:ring-transparent focus:border-gray-200 focus:placeholder-transparent focus:text-gray-600"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
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
                  placeholder="Password"
                  className="input h-10 input-bordered w-full  rounded-lg text-gray-200 placeholder-gray-200 border-gray-200  bg-transparent focus:outline-none focus:ring-transparent focus:border-gray-200 focus:placeholder-transparent focus:text-gray-200"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-200">
                    Confirm Password
                  </span>
                </label>
                <input
                  id="password confirm"
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  type="password"
                  className="input h-10 input-bordered w-full  rounded-lg text-gray-200 placeholder-gray-200 border-gray-200  bg-transparent focus:outline-none focus:ring-transparent focus:border-gray-200 focus:placeholder-transparent focus:text-gray-200"
                  placeholder="Confirm Password"
                />

                <label className="label">
                  <Link
                    to={"/login"}
                    className="label-text-alt link link-hover no-underline text-slate-200"
                  >
                    Already Have an Account? &nbsp; LOGIN
                  </Link>
                </label>
              </div>
              <div className="form-control ">
                <button className="relative inline-flex items-center justify-center p-0.5   mx-8 overflow-hidden text-sm font-medium text-neutral-200 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none dark:focus:ring-blue-800">
                  <span className="relative text-lg w-full px-3 py-1.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Create Account
                  </span>
                </button>

                {/*  */}
                <div className="text-center text-sm text-neutral-200 mt-2">
                  By signing up, you agree to the
                  <a className="no-underline border-b border-grey-dark text-neutral-200">
                    Terms of Service
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
