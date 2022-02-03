import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarHome from "../components/navbarHome";
import isLogin from "../utils/isLogin";

export default function Home() {
  const TOKEN = localStorage.getItem("accessToken");

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [Level, setLevel] = useState("");
  const [levelImagae, setLevelImage] = useState("");
  const [profileMsg, setProfileMsg] = useState("");
  const [timeGoal, setTimeGoal] = useState("");

  useEffect(() => {
    if (isLogin()) {
      axios
        .get("/users", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          const USER = res.data.user;
          setNickname(USER.userNickname);
          setEmail(USER.userEmail);
          setProfileImg(USER.userImg);
          setLevel(USER.userLevel.levelName);
          setLevelImage(USER.userImageLevel.levelImg);
          setProfileMsg(USER.userProfileMsg);
          setTimeGoal(USER.userTimeGoal);
        });
    }
  });

  return (
    <div>
      <NavbarHome sticky="top" />
      <div className="home-userprofile">
        <div className="home-userprofile-userimg"></div>
        <div className="home-userprofile-nickname"></div>
        <div className="home-userprofile-email"></div>
        <div className="home-userprofile-msg"></div>
      </div>
      <Outlet />
    </div>
  );
}
