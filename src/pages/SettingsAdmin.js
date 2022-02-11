import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Modal from "../components/modal";
import isLogin from "../utils/isLogin";

import "../statics/css/settingsAdmin.css";

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
  }, []);

  // 모달창
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 닉네임 중복검사
  const [isNickname, setIsNickname] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [exNickname, checkExNickname] = useState(false);
  const [exNicknameMsg, setExNicknameMsg] = useState("");

  const onChangeNickname = useCallback((event) => {
    const nicknameCurrent = event.target.value;
    setNickname(nicknameCurrent);
    if (nicknameCurrent.length < 2 || nicknameCurrent.length > 10) {
      setNicknameMessage("2글자 이상 10글자 미만으로 입력해주세요");
      setIsNickname(false);
      setExNicknameMsg("");
    } else {
      event.preventDefault();
      axios
        .post(process.env.REACT_APP_SERVER_URL + "/accounts/nickname", {
          nickname: nicknameCurrent,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.statusCode === 200) {
            checkExNickname(true);
            setExNicknameMsg("사용 가능한 닉네임입니다");
            setNicknameMessage("");
            setIsNickname(true);
          } else {
            checkExNickname(false);
            // console.log("hi");
            setExNicknameMsg("이미 사용중인 닉네임입니다");
            setIsNickname(false);
          }
        })
        .catch((err) => {
          // console.log(err);
          checkExNickname(false);
          setExNicknameMsg("이미 사용중인 닉네임입니다");
          setIsNickname(false);
        });
    }
  }, []);
  console.log(nickname);
  // let data = new FormData();
  // data.append("nickname", nickname);
  const onClickNicknameChange = useCallback(() => {
    axios
      .patch(
        process.env.REACT_APP_SERVER_URL + "/users/nickname",
        { nickname: nickname },
        // data,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          window.location.reload();
        }
      });
  });
  console.log(isNickname, exNickname);
  return (
    <div className="settings-admin">
      <div className="settings-admin-nicknameChange">
        <div className="settings-admin__header">닉네임 변경하기</div>
        <div className="settings-admin__body">
          <div className="settings-admin__body-text">
            닉네임 변경 시 기존 닉네임은 일주일동안 이용할 수 없습니다.
          </div>
          <button className="settings-admin__body-btn" onClick={openModal}>
            닉네임 변경하기
          </button>
        </div>
      </div>

      <div className="settings-admin-pwdChange">
        <div className="settings-admin__header">비밀번호 변경하기</div>
        <div className="settings-admin__body">
          <div className="settings-admin__body-text"></div>
          <button className="settings-admin__body-btn">
            비밀번호 변경하기
          </button>
        </div>
      </div>

      <div className="settings-admin-withdraw">
        <div className="settings-admin__header">회원 탈퇴</div>
        <div className="settings-admin__body">
          <div className="settings-admin__body-text">
            <div className="settings-admin__body-text-head">
              탈퇴 후 회원정보가 모두 삭제됩니다.
            </div>
            <div className="settings-admin__body-text-body">
              메일주소, 개설한 자유열람실 등 회원정보가 모두 삭제되며, 삭제된
              데이터는 복구되지 않습니다.
            </div>
            <div className="settings-admin__body-text-head">
              탈퇴 후에도 작성된 게시글은 그대로 남아 있습니다.
            </div>
            <div className="settings-admin__body-text-body">
              게시판에 등록한 게시물은 탈퇴 후에도 남아있습니다. 삭제를 원하시는
              게시물은 탈퇴 전 반드시 삭제하시기 바랍니다. (탈퇴 후에는 게시글
              임의 삭제 요청을 받지 않습니다.)
            </div>
          </div>
          <button className="settings-admin__body-btn">회원 탈퇴</button>
        </div>
      </div>

      <Modal open={modalOpen} close={closeModal} header="">
        <div className="settings-admin-input-nickname">
          <div className="settings-admin-input-nickname-header">
            <span>닉네임 변경</span>

            <div className="settings-admin-confirmbox">
              {nickname.length > 0 && (
                <span className={`message ${exNickname ? "success" : "error"}`}>
                  {exNicknameMsg}
                </span>
              )}
              {nickname.length > 0 && (
                <span className={`message ${isNickname ? "success" : "error"}`}>
                  {nicknameMessage}
                </span>
              )}
            </div>
          </div>
          <div className="settings-admin-formbox">
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력하세요"
              onChange={onChangeNickname}
            />
            <button
              disabled={isNickname && exNickname ? false : true}
              // className={`${isNickname ? "" : "disabled"}`}
              onClick={onClickNicknameChange}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
