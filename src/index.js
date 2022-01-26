import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Studyrooms from "./pages/Studyrooms";
import Meetingrooms from "./pages/Meetingrooms";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Schedule from "./pages/Schedule";
import Login from "./components/login";
import Signup from "./components/signup";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="studyrooms" element={<Studyrooms />} />
          <Route path="meetingrooms" element={<Meetingrooms />} />
          <Route path="schedules" element={<Schedule />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
