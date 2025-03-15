import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./Pages/Add";
import List from "./Pages/List";
import Orders from "./Pages/Orders";
import Login from "./Components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./Pages/MainPage";
import Report from './Pages/Report'
import AdminMarquee from "./Pages/AdminMarquee";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "PKR";
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  // console.log(token);
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer autoClose={2000} />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<MainPage token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/report" element={<Report token={token} />} />
                <Route path="/marquee" element={<AdminMarquee token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
