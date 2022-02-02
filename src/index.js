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
import isLogin from "./utils/isLogin";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={isLogin() ? <Home /> : <Login />} />
        <Route
          path="studyrooms"
          element={isLogin() ? <Studyrooms /> : <Login />}
        />
        <Route
          path="meetingrooms"
          element={isLogin() ? <Meetingrooms /> : <Login />}
        />
        <Route
          path="schedules"
          element={isLogin() ? <Schedule /> : <Login />}
        />
        <Route path="profile" element={isLogin() ? <Profile /> : <Login />} />
        <Route path="settings" element={isLogin() ? <Settings /> : <Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
