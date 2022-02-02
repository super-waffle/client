import axios from "axios";
import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Modal from "./emailConfirm";
import "../statics/css/signup.css";

function SignUp() {
  // const router = useRouter();
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
  const [exNickname, checkExNickname] = useState(false);
  const [exNicknameMsg, setExNicknameMsg] = useState("");

  // 이메일 인증 코드
  const [emailAuth, setEmailAuth] = useState("");
  const [isEmailAuth, setIsEmailAuth] = useState(false);
  const [emailAuthMsg, setEmailAuthMsg] = useState("");
  const [emailExist, setEmailExist] = useState(false);

  // 모달창
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 회원가입
  const [signupSuccess, setSignupSuccess] = useState(false);
  const onSubmit = useCallback(
    (event) => {
      // event.preventDefault();
      console.log(email, nickname, password);
      setSignupSuccess(false);
      axios
        .post(
          "accounts",
          {
            email: email,
            nickname: nickname,
            password: password,
          },
          {
            headers: {},
          }
        )
        .then((res) => {
          if (res.data.statusCode === 200) {
            console.log(res);
            setSignupSuccess(true);
          } else {
            setSignupSuccess(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [email, nickname, password]
  );
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

  // 이메일 인증 검사(메일 발송)
  const onClickEmail = useCallback(
    (event) => {
      // event.preventDefault();
      console.log(email);
      axios
        .post("/emails", {
          email: email,
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            console.log(res.data);
            setEmailExist(false);
          } else {
            setEmailExist(true);
            setEmailAuthMsg("이미 가입된 이메일입니다");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("hi");
          setEmailExist(true);
          setEmailAuthMsg("이미 가입된 이메일입니다");
        });
    },
    [email]
  );

  // 이메일 인증 코드 검증
  const onClickAuthEmail = useCallback(
    (event) => {
      console.log(emailAuth);
      axios
        .post("/emails/auth", {
          email: email,
          authCode: emailAuth,
        })
        .then((res) => {
          console.log(res);
          if (res.data.statusCode === 200) {
            setIsEmailAuth(true);
            setEmailMessage("이메일 인증이 완료되었습니다");
          } else {
            setEmailAuthMsg("인증 코드가 일치하지 않습니다");
          }
        })
        .catch((err) => {
          console.log(err);
          setEmailAuthMsg("인증 코드가 일치하지 않습니다");
        });
    },
    [email, emailAuth]
  );
  //닉네임 유효성 검사 & 중복 검사
  // [TODO] : 닉네임에 특수문자 포함 안되는 유효성 검사 추가하기(특수문자 정규식 추가)
  const onChangeNickname = useCallback((event) => {
    const nicknameCurrent = event.target.value;
    // console.log(nicknameCurrent);
    setNickname(nicknameCurrent);
    if (nicknameCurrent.length < 2 || nicknameCurrent.length > 10) {
      setNicknameMessage("2글자 이상 10글자 미만으로 입력해주세요");
      setIsNickname(false);
      setExNicknameMsg("");
    } else {
      event.preventDefault();
      axios
        .post("/accounts/nickname", {
          nickname: nicknameCurrent,
        })
        .then((res) => {
          console.log(res);
          if (res.data.statusCode === 200) {
            checkExNickname(true);
            setExNicknameMsg("사용 가능한 닉네임입니다");
            setNicknameMessage("");
            setIsNickname(true);
          } else {
            checkExNickname(false);
            console.log("hi");
            setExNicknameMsg("이미 사용중인 닉네임입니다");
            setIsNickname(false);
          }
        })
        .catch((err) => {
          console.log(err);
          checkExNickname(false);
          setExNicknameMsg("이미 사용중인 닉네임입니다");
          setIsNickname(false);
        });
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
  const onChangePasswordConfirm = useCallback(
    (event) => {
      const passwordConfirmCurrent = event.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  return (
    <div className="signup">
      <div className="signup-image">
        <img src="images/login.jpg" alt=""></img>
      </div>
      <div className="signup-feat">
        {!signupSuccess && (
          <div className="signup-feat-box">
            <div className="signup-feat-box-header">
              <span>Sign Up</span>
              <div className="content">공부하는습관에 오신걸 환영합니다!</div>
            </div>
            <div className="signup-feat-box-content">
              <div className="input-email">
                <div className="input-email-header">
                  <span>E-mail</span>
                  <div className={`${isEmailAuth ? "hidden" : ""}`}>
                    <button
                      className={`cert ${isEmail ? "" : "hidden"}`}
                      onClick={() => {
                        openModal();
                        onClickEmail();
                      }}
                    >
                      이메일 인증하기
                    </button>
                  </div>
                  <Modal open={modalOpen} close={closeModal} header=" ">
                    {!isEmailAuth && !emailExist && (
                      <div>
                        <div className="body-heading1">
                          {" "}
                          인증코드가 발송되었습니다
                        </div>
                        <div className="body-heading2">
                          인증코드 입력시 회원가입이 계속됩니다
                        </div>
                        <div>
                          <span
                            className={`auth-message ${
                              isEmailAuth ? "hidden" : ""
                            }`}
                          >
                            {emailAuthMsg}
                          </span>
                          <input
                            id="emailAuth"
                            placeholder="인증코드를 입력하세요"
                            onChange={(e) => setEmailAuth(e.target.value)}
                            value={emailAuth}
                          />
                          <button
                            type="submit"
                            className="btn-xs"
                            onClick={onClickAuthEmail}
                          >
                            인증
                          </button>
                        </div>
                      </div>
                    )}
                    <div className={`${isEmailAuth ? "show" : "hidden"}`}>
                      <div className="content">
                        <img src="icons/success-filled.svg" alt=""></img>
                        <div className="body-heading1">
                          인증이 완료되었습니다
                        </div>
                      </div>
                      <button onClick={closeModal} className="btn-m">
                        확인
                      </button>
                    </div>
                    <div className={`${emailExist ? "exist" : "hidden"}`}>
                      <span className="body-heading1">
                        이미 가입된 회원입니다.
                      </span>
                      <div className="pwd-search">
                        <span className="body-heading2">
                          비밀번호를 잊으셨나요?
                        </span>
                        <span className="body-heading2">비밀번호 찾기</span>
                      </div>
                      <button className="btn-m" onClick={closeModal}>
                        닫기
                      </button>
                    </div>
                  </Modal>
                </div>
                <div className="formbox">
                  <input
                    id="email"
                    type="text"
                    placeholder="이메일을 입력하세요"
                    onChange={onChangeEmail}
                    disabled={isEmailAuth ? true : false}
                  />
                  {email.length > 0 && (
                    <span
                      className={`message ${isEmail ? "success" : "error"}`}
                    >
                      {emailMessage}
                    </span>
                  )}
                </div>
              </div>
              <div className="input-nickname">
                <div className="input-nickname-header">
                  <span>Nickname</span>
                  <div className="confirmbox">
                    {nickname.length > 0 && (
                      <span
                        className={`message ${
                          exNickname ? "success" : "error"
                        }`}
                      >
                        {exNicknameMsg}
                      </span>
                    )}
                  </div>
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
                  onClick={onSubmit}
                  type="submit"
                  className={`${
                    isNickname &&
                    isEmail &&
                    isPassword &&
                    // isEmailAuth &&
                    isPasswordConfirm
                      ? "btn-xl"
                      : "disabled"
                  }`}
                  disabled={
                    // isEmailAuth &&
                    isNickname && isEmail && isPassword && isPasswordConfirm
                      ? false
                      : true
                  }
                >
                  SIGN UP
                </button>
              </div>
            </div>
            <div className="signup-feat-box-footer">
              <span>이미 공습 회원이신가요? </span>
              <Link to="/login" className="footer-tologin">
                Log In
              </Link>
            </div>
          </div>
        )}
        {signupSuccess && (
          <div className="signup-success">
            <span className="signup-success-heading2">
              회원가입이 완료되었습니다
            </span>
            <span className="signup-success-heading1">
              <img src="icons/_paper-plane.svg" alt=""></img>
              공습에 오신 걸 환영합니다
            </span>
            <button to="/login">로그인</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default SignUp;
