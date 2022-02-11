import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import isLogin from "../utils/isLogin";

export default function SettingsAdmin() {
  const [nickname, setNickname] = useState("");
  const TOKEN = localStorage.getItem("accessToken");

  useEffect(() => {
    if (isLogin) {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "/users", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          const USER = res.data.user;
          setNickname(USER.userNickname);
        });
    }
  });
  const onClickNicknameChange = useCallback(() => {
    axios.patch("users/nickname", {});
  });
  return (
    <div className="settings-admin">
      <div className="settings-admin-nicknameChange">
        <div className="settings-admin-nicknameChange__header">
          닉네임 변경하기
        </div>
        <div className="settings-admin-nicknameChange__body">
          <div className="settings-admin-nicknameChange__body-text"></div>
          <button className="settings-admin-nicknameChange__body-btn">
            닉네임 변경하기
          </button>
        </div>
      </div>

      <div className="settings-admin-pwdChange">
        <div className="settings-admin-pwdChange__header">
          비밀번호 변경하기
        </div>
        <div className="settings-admin-pwdChange__body">
          <div className="settings-admin-pwdChange__body-text"></div>
          <button className="settings-admin-pwdChange__body-btn">
            비밀번호 변경하기
          </button>
        </div>
      </div>

      <div className="settings-admin-withdraw">
        <div className="settings-admin-withdraw__header">회원 탈퇴</div>
        <div className="settings-admin-withdraw__body">
          <div className="settings-admin-withdraw__body-text"></div>
          <button className="settings-admin-withdraw__body-btn">
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
