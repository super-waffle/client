import React from "react";
// import { Outlet } from "react-router-dom";
// import { useState } from "react/cjs/react.development";
import Navbar from "./components/navbar";
import isLogin from "./utils/isLogin";
import "./statics/css/main.css";

function App() {
  return (
    <div>
      {isLogin() && <Navbar sticky="top" />}
      <p>Landing Page</p>
    </div>
  );
}

export default App;
