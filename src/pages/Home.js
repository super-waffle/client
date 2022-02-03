import React from "react";
import { Outlet } from "react-router-dom";
import NavbarHome from "../components/navbarHome";

export default function Home() {
  console.log("home");
  return (
    <div>
      <NavbarHome sticky="top" />
      <Outlet />
    </div>
  );
}
