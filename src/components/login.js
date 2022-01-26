import React, { useState } from "react";
import "../statics/css/login.css";
import axios from "axios";

function Login() {
  // const { setUser } = useUserContext();
  // const history = useHistory();
  // const [account, setAccount] = useState({
  //   id: "",
  //   password: "",
  // });

  // const onChange
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
              <input id="email" type="text" placeholder="이메일을 입력하세요" />
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
              />
            </div>
            <div className="submit-btn">
              <button className="btn-xl">LOG IN</button>
            </div>
          </div>
          <div className="login-feat-box-footer">
            <span>공습이 처음이신가요? </span>
            <span>Create an Account</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
