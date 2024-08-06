import React from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

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
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
