import React from "react";
import { Outlet } from "react-router-dom";
// import { useState } from "react/cjs/react.development";
import Navbar from "./components/navbar";
import isLogin from "./utils/isLogin";
import "./statics/css/main.css";

function App() {
  console.log(isLogin());
  return (
    <div>
      {isLogin() && <Navbar sticky="top" />}
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      ></nav>
      <Outlet />
      <p>Landing Page</p>
    </div>
  );
}

export default App;
