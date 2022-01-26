import React, { useState } from "react";
import "../statics/css/signup.css";

function SignUp() {
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
                <div className="cert">이메일 인증하기</div>
              </div>
              <input id="email" type="text" placeholder="이메일을 입력하세요" />
            </div>
            <div className="input-nickname">
              <div className="input-nickname-header">
                <span>Nickname</span>
                <div className="cert">닉네임 중복검사</div>
              </div>
              <input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
              />
            </div>
            <div className="input-pwd">
              <span>Password</span>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
              <input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 한 번 입력하세요"
              />
            </div>
            <div className="submit-btn">
              <button className="btn-xl">SIGN UP</button>
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
