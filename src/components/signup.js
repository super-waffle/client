import axios from "axios";
import React, { useState, useCallback } from "react";
import "../statics/css/signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 중복 검사
  const [exNickname, checkExNickname] = useState("");

  //닉네임 중복확인
  const nicknameCheck = useCallback((event) => {
    event.preventDefault();
    console.log(nickname);
    axios
      .post("http://localhost:3000/signup", {
        user_nickname: nickname,
      })
      .then((res) => {
        console.log(res);
      });
  });

  // 이메일 유효성 검사
  const onChangeEmail = useCallback((event) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = event.target.value;
    setEmail(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("올바른 이메일 형식이 아닙니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  }, []);

  //닉네임 유효성 검사
  // [TODO] : 닉네임에 특수문자 포함 안되는 유효성 검사 추가하기(특수문자 정규식 추가)
  const onChangeNickname = useCallback((event) => {
    const nicknameCurrent = event.target.value;
    setNickname(nicknameCurrent);
    if (nicknameCurrent.length < 2 || nicknameCurrent.length > 10) {
      setNicknameMessage("2글자 이상 10글자 미만으로 입력해주세요");
      setIsNickname(false);
    } else {
      setNicknameMessage("");
      setIsNickname(true);
    }
  }, []);

  // 비밀번호 유효성 검사
  const onChangePassword = useCallback((event) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = event.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "영문자+숫자+특수문자 조합으로 8자리 이상 입력해주세요"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("사용 가능한 비밀번호입니다");
      setIsPassword(true);
    }
  }, []);

  //비밀번호 확인
  const onChangePasswordConfirm = useCallback((event) => {
    const passwordConfirmCurrent = event.target.value;
    setPasswordConfirm(passwordConfirmCurrent);

    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다");
      setIsPasswordConfirm(false);
    }
  });

  return (
    <div className="signup">
      <div className="signup-image">
        <img src="images/login.jpg" alt=""></img>
      </div>
      <div className="signup-feat">
        <div className="signup-feat-box">
          <div className="signup-feat-box-header">
            <span>Sign Up</span>
            <div className="content">공부하는습관에 오신걸 환영합니다!</div>
          </div>
          <div className="signup-feat-box-content">
            <div className="input-email">
              <div className="input-email-header">
                <span>E-mail</span>
                <button className="cert">이메일 인증하기</button>
              </div>
              <div className="formbox">
                <input
                  id="email"
                  type="text"
                  placeholder="이메일을 입력하세요"
                  onChange={onChangeEmail}
                />
                {email.length > 0 && (
                  <span className={`message ${isEmail ? "success" : "error"}`}>
                    {emailMessage}
                  </span>
                )}
              </div>
            </div>
            <div className="input-nickname">
              <div className="input-nickname-header">
                <span>Nickname</span>
                <button className="cert" onClick={nicknameCheck}>
                  닉네임 중복검사
                </button>
              </div>
              <div className="formbox">
                <input
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  onChange={onChangeNickname}
                />
                {nickname.length > 0 && (
                  <span
                    className={`message ${isNickname ? "success" : "error"}`}
                  >
                    {nicknameMessage}
                  </span>
                )}
              </div>
            </div>
            <div className="input-pwd">
              <span>Password</span>
              <div className="formbox">
                <input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  onChange={onChangePassword}
                />
                {password.length > 0 && (
                  <span
                    className={`message ${isPassword ? "success" : "error"}`}
                  >
                    {passwordMessage}
                  </span>
                )}
              </div>
              <div className="formbox">
                <input
                  id="passwordConfirm"
                  type="password"
                  placeholder="비밀번호를 다시 한 번 입력하세요"
                  onChange={onChangePasswordConfirm}
                />
                {passwordConfirm.length > 0 && (
                  <span
                    className={`message ${
                      isPasswordConfirm ? "success" : "error"
                    }`}
                  >
                    {passwordConfirmMessage}
                  </span>
                )}
              </div>
            </div>
            <div className="submit-btn">
              <button
                type="submit"
                className={`${
                  isNickname && isEmail && isPassword && isPasswordConfirm
                    ? "btn-xl"
                    : "disabled"
                }`}
              >
                SIGN UP
              </button>
            </div>
          </div>
          <div className="signup-feat-box-footer">
            <span>이미 공습 회원이신가요? </span>
            <span>Log In</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
