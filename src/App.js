import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import LoginForm from "./Forms/LoginForm/LoginForm";
import SignUpForm from "./Forms/LoginForm/SignUpForm/SignUpForm";
import Message from "./Components/Message/Message";
import io from "socket.io-client";
function App() {
  const socket = io("/");
  const userInfo = localStorage.getItem("UserInfo");
  if (userInfo) {
    console.log("hit");

    socket.on("connect", () => {
      console.log("connected");
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/user/:id" element={<Message socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
