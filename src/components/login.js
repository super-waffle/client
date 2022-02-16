import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../statics/css/login.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = useCallback(() => {
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/accounts/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        const STATUS = res.data.statusCode;
        if (STATUS === 200) {
          setErrorMsg("");
          const accessToken = res.data.accessToken;

          //localStorage에 jwt저장
          // [TODO]: refresh jwt token
          localStorage.setItem("accessToken", accessToken);

          // api 통신 시 header에 jwt token default값으로 전송
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          const currentToken = localStorage.getItem("accessToken");
          if (currentToken !== null) {
            // setTimeout(() => {
            //   navigate("/home/tab=todays");
            //   window.location.reload();
            // }, 2000);
            // window.location.reload();
            navigate("/home/tab=todays");
            window.location.reload();
          }
        } else if (STATUS === 404) {
          setErrorMsg("가입되지 않은 사용자입니다");
        } else if (STATUS === 401) {
          setErrorMsg("비밀번호가 일치하지 않습니다");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, password, navigate]);
  const onKeyEnter = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="login">
      <div className="login-image">
        <img src="images/login.jpg" alt=""></img>
      </div>
      <div className="login-feat">
        <div className="login-feat-box">
          <div className="login-feat-box-header">
            <span>Log In</span>
            <div className="content">공부하는습관에 오신걸 환영합니다!</div>
          </div>
          <div className="login-feat-box-content">
            <div className="input-email">
              <span>E-mail</span>
              <input
                id="email"
                type="text"
                placeholder="이메일을 입력하세요"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-pwd">
              <div className="input-pwd-header">
                <span>Password</span>
                <div className="content">비밀번호를 잊으셨나요?</div>
              </div>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={onKeyEnter}
              />
            </div>
            <div className="submit-btn">
              <span className="message error">{errorMsg}</span>
              <button onClick={onSubmit} className="btn-xl">
                LOG IN
              </button>
            </div>
          </div>
          <div className="login-feat-box-footer">
            <span>공습이 처음이신가요? </span>
            <Link className="signup-link" to={"/signup"}>
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
