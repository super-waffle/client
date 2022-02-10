import axios from "axios";
import { useCallback, useEffect, useState } from "react";
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
        .get(process.env.REACT_APP_SERVER_URL + "/users", {
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

  let data = new FormData();

  data.append("timeGoal", timeGoal);
  data.append("profileMessage", profileMsg);
  data.append("profileImage", profileImg);
  const onClickUpdate = useCallback(() => {
    axios
      .patch(
        process.env.REACT_APP_SERVER_URL + "/users",
        data,
        // {
        //   timeGoal: timeGoal,
        //   profileMessage: profileMsg,
        //   profileImage: profileImg,
        // },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  });
  return (
    <div className="settings-profile">
      <div className="settings-profile__box">
        <div className="settings-profile__box-heading">내 프로필 관리</div>
        <div className="settings-profile__box-body">
          <div className="settings-profile__box-text">
            <div className="settings-profile__box-text__title">닉네임</div>
            <div className="settings-profile__box-text__disabled">
              <span>{nickname}</span>
            </div>
            <div className="settings-profile__box-text__title">이메일</div>
            <div className="settings-profile__box-text__disabled">{email}</div>
            <div className="settings-profile__box-text__title">
              목표 공부 시간
            </div>
            <input
              className="settings-profile__box-text__timegoal"
              value={timeGoal}
              onChange={useCallback((event) => {
                setTimeGoal(event.target.value);
              })}
            />
            <div className="settings-profile__box-text__title">상태 메세지</div>
            <textarea
              className="settings-profile__box-text__msg"
              value={profileMsg}
              onChange={useCallback((event) => {
                setProfileMsg(event.target.value);
              })}
            />
            <button
              className="settings-profile__box-btn"
              onClick={onClickUpdate}
            >
              프로필 업데이트
            </button>
          </div>
          <div className="settings-profile__box-img">
            {profileImg === null && (
              <svg
                width="250"
                height="250"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_233_15455)">
                  <path
                    d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                    fill="#f4f4f4"
                  />
                  <path
                    d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                    fill="#c0c0c0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_233_15455">
                    <path
                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
