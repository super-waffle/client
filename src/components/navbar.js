import React from "react";
import { Link } from "react-router-dom";
import "../statics/css/navbar.css";
import axios from "axios";

function Navbar() {
  // console.log("hi");
  const token = localStorage.getItem("accessToken");
  // console.log(token);
  axios
    .get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const USER = res.data.user;
      const profileImg = USER.userImg;
      const nickname = USER.userNickname;
      const email = USER.userEmail;
      console.log(profileImg, nickname, email);
    });
  // console.log(res);
  return (
    <div className="navbar">
      <div className="navbar-menus">
        <Link className="menu" to={"/home"}>
          홈
        </Link>
        <Link className="menu" to={"meetingrooms"}>
          자유열람실
        </Link>
        <Link className="menu" to={"/studyrooms"}>
          스터디룸
        </Link>
        <Link className="menu" to={"/schedules"}>
          일정관리
        </Link>
      </div>
      <div className="navbar-profile">
        <img src="icons/notice.svg" alt=""></img>
      </div>
    </div>
  );
}
export default Navbar;
