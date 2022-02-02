import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../statics/css/navbar.css";
import axios from "axios";
import { useState } from "react/cjs/react.development";
import isLogin from "../utils/isLogin";

function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("accessToken");

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // logout
  const onClickLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  // darkmode
  useEffect(() => {
    const bgMode = window.localStorage.getItem("bgMode");
    if (bgMode === "dark") {
      document.getElementsByTagName("html")[0].classList.add("ui-dark");
    }
  }, []);

  const darkOnOff = () => {
    if (
      document.getElementsByTagName("html")[0].classList.contains("ui-dark")
    ) {
      document.getElementsByTagName("html")[0].classList.remove("ui-dark");
      window.localStorage.setItem("bgMode", "light");
      setIsDark(false);
    } else {
      document.getElementsByTagName("html")[0].classList.add("ui-dark");
      window.localStorage.setItem("bgMode", "dark");
      setIsDark(true);
    }
  };

  // dropdown
  const onClickDropdown = () => setIsActive(!isActive);
  // dropdown (외부 클릭시 닫기)
  useEffect(() => {
    const pageClickEvent = (event) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  // 유저 정보 불러오기
  if (isLogin()) {
    axios
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const USER = res.data.user;
        setProfileImg(USER.userImg);
        setNickname(USER.userNickname);
        setEmail(USER.userEmail);
        // console.log(profileImg, nickname, email);
      });
    // console.log(res);
  }

  return (
    <div>
      <div className="navbar">
        <div className="navbar-menus">
          <Link className="menu" to={"/home"}>
            홈
          </Link>
          <Link className="menu" to={"/meetingrooms"}>
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
          {!isDark && (
            <img
              className="dark-light"
              src="icons/_sun.svg"
              alt=""
              onClick={darkOnOff}
            ></img>
          )}
          {isDark && (
            <img
              className="dark-light"
              src="icons/_moon.svg"
              alt=""
              onClick={darkOnOff}
            ></img>
          )}
          <img
            className="navbar-profile-alarm"
            src="icons/notice.svg"
            alt=""
          ></img>
          {profileImg === null && (
            <img
              className="navbar-profile-img"
              src="icons/_default-user.svg"
              alt=""
              onClick={onClickDropdown}
            ></img>
          )}
          {profileImg !== null && (
            <img
              className="navbar-profile-img"
              // src="profileImg"
              alt=""
              onClick={onClickDropdown}
            ></img>
          )}
        </div>
      </div>
      <div
        ref={dropdownRef}
        className={`navbar-dropdown ${isActive ? "active" : "hidden"}`}
      >
        <div className="navbar-dropdown-list">
          <span className="navbar-dropdown-nickname">{nickname}</span>
          <span className="navbar-dropdown-email">{email}</span>
        </div>
        <div className="navbar-dropdown-list">
          <button
            className="dropdown-menu"
            onClick={() => {
              navigate("profile");
            }}
          >
            내 프로필
          </button>
          <button
            className="dropdown-menu"
            onClick={() => {
              navigate("settings");
            }}
          >
            관리실
          </button>
        </div>
        <div className="navbar-dropdown-list">
          <button className="dropdown-menu" onClick={onClickLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
