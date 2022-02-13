import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import isLogin from '../utils/isLogin';
import '../statics/css/settingsProfile.css';

export default function SettingsProfile() {
  const [nickname, setNickname] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [email, setEmail] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [timeGoal, setTimeGoal] = useState('');
  const TOKEN = localStorage.getItem('accessToken');

  // 유저 정보 불러오기
  async function getUserInfo() {
    const response = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const USER = response.data.user;
    setProfileImg(USER.userImg);
    setNickname(USER.userNickname);
    setEmail(USER.userEmail);
    setProfileMsg(USER.userProfileMsg);
    setTimeGoal(USER.userTimeGoal);
  }
  useEffect(() => {
    if (isLogin()) {
      getUserInfo();
    }
    return () => {};
  }, []);

  // 업로드한 이미지 바로 보여주기
  const [fileImage, setFileImage] = useState('');
  const imageURL = 'https://i6a301.p.ssafy.io:8080/images/' + profileImg;
  // console.log(fileImage);

  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    setProfileImg(e.target.files[0]);
    // console.log(fileImage);
  };

  // dropdown
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);
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

  // form data 형식으로 바꿔서 서버에 전달하기
  let data = new FormData();

  data.append('timeGoal', timeGoal);
  data.append('profileMessage', profileMsg);
  data.append('profileImage', profileImg);

  let dataWithoutImg = new FormData();
  dataWithoutImg.append('timeGoal', timeGoal);
  dataWithoutImg.append('profileMessage', profileMsg);

  // 이미지 삭제할 경우 서버에 전달
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage('');
    setProfileImg(null);
    setIsActive(!isActive);
    axios
      .patch(
        process.env.REACT_APP_SERVER_URL + '/users/profile/image',
        dataWithoutImg,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
      });
  };

  // 서버에 전달
  const onClickUpdate = useCallback(() => {
    if (fileImage) {
      axios
        .patch(process.env.REACT_APP_SERVER_URL + '/users', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          window.location.reload();
          // console.log(res);
        });
    } else if (!fileImage) {
      axios
        .patch(process.env.REACT_APP_SERVER_URL + '/users', dataWithoutImg, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          window.location.reload();
          // console.log(res);
        });
    }
  });
  // console.log(nickname, email, profileImg, profileMsg, timeGoal);
  // console.log(fileImage);
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
            <div className="settings-profile__box-text__title">프로필 사진</div>
            <div className="settings-profile__box-img-file-wrapper">
              <svg
                className="settings-profile__box-img-file"
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
              {profileImg && !fileImage && (
                <img
                  className="settings-profile__box-img-file"
                  src={imageURL}
                  alt=""
                />
              )}
              {profileImg && fileImage && (
                <img
                  className="settings-profile__box-img-file"
                  src={fileImage}
                  alt=""
                />
              )}
            </div>
            <button
              className="settings-profile-box-img-edit"
              onClick={onClickDropdown}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.935 4.15998L13 1.20999C12.8061 1.01702 12.5436 0.908691 12.27 0.908691C11.9964 0.908691 11.7339 1.01702 11.54 1.20999L1.135 11.6L0.184998 15.7C0.152226 15.8499 0.153349 16.0052 0.188286 16.1546C0.223223 16.3039 0.29109 16.4436 0.38693 16.5634C0.482769 16.6832 0.604161 16.7801 0.742236 16.847C0.880311 16.9139 1.03158 16.9491 1.185 16.95C1.25648 16.9572 1.32851 16.9572 1.4 16.95L5.545 16L15.935 5.61999C16.128 5.42604 16.2363 5.16358 16.2363 4.88998C16.2363 4.61639 16.128 4.35393 15.935 4.15998ZM5.045 15.1L1.16 15.915L2.045 12.105L9.83 4.34998L12.83 7.34999L5.045 15.1ZM13.5 6.62499L10.5 3.62498L12.24 1.89499L15.19 4.89498L13.5 6.62499Z"
                  fill="var(--textColor-dark)"
                />
              </svg>
              EDIT
            </button>
            <div
              ref={dropdownRef}
              className={`profileImageEdit-dropdown ${
                isActive ? 'active' : 'hidden'
              }`}
            >
              <div className="profileImageEdit-dropdown-list">
                <div className="filebox">
                  <label htmlFor="file">프로필 사진 업로드</label>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={saveFileImage}
                    onClick={() => setIsActive(!isActive)}
                  />
                </div>
                <button onClick={deleteFileImage}>프로필 사진 삭제하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
