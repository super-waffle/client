import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../statics/css/navbar.css';
import axios from 'axios';
import isLogin from '../utils/isLogin';

function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const token = localStorage.getItem('accessToken');

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const imageURL = 'https://i6a301.p.ssafy.io:8080/images/' + profileImg;

  // logout
  const onClickLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
    window.location.reload();
  };

  // darkmode
  useEffect(() => {
    const bgMode = window.localStorage.getItem('bgMode');
    if (bgMode === 'dark') {
      document.getElementsByTagName('html')[0].classList.add('ui-dark');
    }
  }, []);

  const darkOnOff = () => {
    if (
      document.getElementsByTagName('html')[0].classList.contains('ui-dark')
    ) {
      document.getElementsByTagName('html')[0].classList.remove('ui-dark');
      window.localStorage.setItem('bgMode', 'light');
      setIsDark(false);
    } else {
      document.getElementsByTagName('html')[0].classList.add('ui-dark');
      window.localStorage.setItem('bgMode', 'dark');
      setIsDark(true);
    }
  };

  // dropdown
  const onClickDropdown = () => setIsActive(!isActive);
  // dropdown (외부 클릭시 닫기)
  useEffect(() => {
    const pageClickEvent = (event) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive]);

  // 유저 정보 불러오기
  async function getUserInfo() {
    const response = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const USER = response.data.user;
    setProfileImg(USER.userImg);
    setNickname(USER.userNickname);
    setEmail(USER.userEmail);
  }
  useEffect(() => {
    if (isLogin()) {
      getUserInfo();
    }
    return () => {};
  }, []);

  return (
    <div>
      <div className="navbar">
        <div className="navbar-menus">
          <Link className="menu" to={'/home/tab=todays'}>
            홈
          </Link>
          <Link className="menu" to={'/meetingrooms'}>
            자유열람실
          </Link>
          <Link className="menu" to={'/studyrecruit'}>
            스터디 모집
          </Link>
          <Link className="menu" to={'/schedules'}>
            일정관리
          </Link>
        </div>
        <div className="navbar-profile">
          {!isDark && (
            <svg
              className="dark-light"
              onClick={darkOnOff}
              width="16"
              height="16"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_753_4048)">
                <path
                  d="M6.50002 9.20835C7.99579 9.20835 9.20835 7.99579 9.20835 6.50002C9.20835 5.00425 7.99579 3.79169 6.50002 3.79169C5.00425 3.79169 3.79169 5.00425 3.79169 6.50002C3.79169 7.99579 5.00425 9.20835 6.50002 9.20835Z"
                  stroke="#ededed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 0.541687V1.62502"
                  stroke="#ededed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 11.375V12.4583"
                  stroke="#ededed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.28583 2.28583L3.05499 3.05499"
                  stroke="#ededed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.94501 9.94501L10.7142 10.7142"
                  stroke="#ededed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0.541687 6.5H1.62502"
                  stroke="#ededed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.375 6.5H12.4583"
                  stroke="#ededed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.28583 10.7142L3.05499 9.94501"
                  stroke="#ededed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.94501 3.05499L10.7142 2.28583"
                  stroke="#ededed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_753_4048">
                  <rect width="13" height="13" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
          {isDark && (
            <svg
              className="dark-light"
              onClick={darkOnOff}
              width="16"
              height="16"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.6875 0.8125C3.65625 0.8125 1.21875 2.84375 1.21875 6.09375C1.21875 9.34375 3.65625 11.7812 6.90625 11.7812C10.1562 11.7812 12.1875 9.34375 12.1875 7.3125C7.71875 10.1562 2.84375 5.28125 5.6875 0.8125Z"
                stroke="#ededed"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <svg
            className="navbar-profile-alarm"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 14.1667H7.49998M12.5 14.1667H16.6666L15.4958 12.9958C15.3386 12.8386 15.2139 12.6519 15.1288 12.4464C15.0437 12.2409 14.9999 12.0207 15 11.7983V9.16667C15.0001 8.13245 14.6796 7.12362 14.0827 6.27907C13.4857 5.43453 12.6416 4.7958 11.6666 4.45083V4.16667C11.6666 3.72464 11.491 3.30072 11.1785 2.98816C10.8659 2.67559 10.442 2.5 9.99998 2.5C9.55795 2.5 9.13403 2.67559 8.82147 2.98816C8.50891 3.30072 8.33331 3.72464 8.33331 4.16667V4.45083C6.39165 5.1375 4.99998 6.99 4.99998 9.16667V11.7992C4.99998 12.2475 4.82165 12.6783 4.50415 12.9958L3.33331 14.1667H7.49998H12.5ZM12.5 14.1667V15C12.5 15.663 12.2366 16.2989 11.7677 16.7678C11.2989 17.2366 10.663 17.5 9.99998 17.5C9.33694 17.5 8.70105 17.2366 8.23221 16.7678C7.76337 16.2989 7.49998 15.663 7.49998 15V14.1667H12.5Z"
              stroke="#CCCCCC"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="navbar-profile-img-wrapper">
            <svg
              className="navbar-profile-img"
              onClick={onClickDropdown}
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
            {profileImg && (
              <img
                className="navbar-profile-img"
                src={imageURL}
                alt=""
                onClick={onClickDropdown}
              />
            )}
          </div>
        </div>
      </div>
      <div
        ref={dropdownRef}
        className={`navbar-dropdown ${isActive ? 'active' : 'hidden'}`}
      >
        <div className="navbar-dropdown-list">
          <span className="navbar-dropdown-nickname">{nickname}</span>
          <span className="navbar-dropdown-email">{email}</span>
        </div>
        <div className="navbar-dropdown-list">
          <button
            // className="dropdown-menu"
            onClick={() => {
              navigate('profile');
              setIsActive(!isActive);
            }}
          >
            내 프로필
          </button>
          <button
            // className="dropdown-menu"
            onClick={() => {
              navigate('settings/profile');
              setIsActive(!isActive);
            }}
          >
            관리실
          </button>
        </div>
        <div className="navbar-dropdown-list">
          <button onClick={onClickLogout}>로그아웃</button>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
