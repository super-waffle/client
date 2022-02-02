import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react/cjs/react.development";
import Navbar from "./components/navbar";
import NavbarLanding from "./components/navbarLanding";
import isLogin from "./utils/isLogin";
import "./statics/css/main.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      {isLogin() && <Navbar sticky="top" />}
      {!isLogin() && <NavbarLanding sticky="top" />}
      <p>Landing Page</p>
      <Outlet />
    </div>
  );
}

export default App;
