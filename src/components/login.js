import React from "react";
import "../statics/css/login.css";

function Login() {
  return (
    <div className="login">
      <div className="login-image">
        <img src="images/login.jpg" alt=""></img>
      </div>
      <div className="login-feat">
        <div className="login-feat-box">
          <div className="login-feat-box-header">
            <span>Log In</span>
            <p>공부하는습관에 오신걸 환영합니다!</p>
          </div>
          <div className="login-feat-box-content">
            <div className="input-email">
              <span>Email</span>
              <input id="email" type="text" placeholder="이메일을 입력하세요" />
            </div>
            <div className="input-pwd">
              <span>Password</span>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className="submit-btn">
              <button>LOG IN</button>
            </div>
          </div>
          <div className="login-feat-box-footer">
            <button>아직 회원이 아니신가요?</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
