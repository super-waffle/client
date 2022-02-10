import axios from "axios";
import { useEffect, useState } from "react";
import isLogin from "../utils/isLogin";
import "../statics/css/settingsProfile.css";

export default function SettingsProfile() {
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [email, setEmail] = useState("");
  const [profileMsg, setProfileMsg] = useState("");
  const [timeGoal, setTimeGoal] = useState("");
  const TOKEN = localStorage.getItem("accessToken");
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
          console.log(USER);
          setProfileImg(USER.userImg);
          setNickname(USER.userNickname);
          setEmail(USER.userEmail);
          setProfileMsg(USER.userProfileMsg);
          setTimeGoal(USER.userTimeGoal);
        });
    }
  }, []);
  console.log(nickname, email, profileImg, profileMsg, timeGoal);
  return (
    <div className="settings-profile">
      <div className="settings-profile__box">
        <div className="settings-profile__box-heading">내 프로필 관리</div>
        <div className="settings-profile__box-text">
          <div className="settings-profile__box-text__nickname">
            <span>{nickname}</span>
          </div>
          <div className="settings-profile__box-text__email"></div>
          <div className="settings-profile__box-text__timegoal"></div>
          <div className="settings-profile__box-text__msg"></div>
          <button></button>
        </div>
        <div className="settings-profile__box-img"></div>
      </div>
    </div>
  );
}
