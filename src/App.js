import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import "./statics/css/main.css";

function App() {
  return (
    <div>
      <Navbar sticky="top" />
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      ></nav>
      <Outlet />
    </div>
  );
}

export default App;
