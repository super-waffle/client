import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../statics/css/settingsStudy.css";

export default function SettingsStudy() {
  const TOKEN = localStorage.getItem("accessToken");
  const [nickname, setNickname] = useState("");
  const [myStudyData, setMyStudyData] = useState("");
  const [showStudyDetail, setShowStudyDetail] = useState(false);
  const [studySeq, setStudySeq] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const imageURL = "https://i6a301.p.ssafy.io:8080/images/" + profileImg;

  // 스터디 정보 불러오기
  useEffect(() => {
    axios
      .get("/users/studies", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const data = res.data.studyList;
        setMyStudyData(() => data);
      });
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/users", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res);
        const USER = res.data.user;
        setNickname(USER.userNickname);
        setProfileImg(USER.userImg);
      });
  }, []);

  // 스터디 모집중인지 진행중인지 모집마감인지 스터디 종료인지 판단
  const checkStudyStatus = useCallback((study) => {
    if (nickname === study.hostName) {
      if (study.isRecruiting && study.startDate === null) {
        return "모집중";
      }
      if (!study.isRecruiting && study.startData !== null) {
        return "모집마감";
      }
      if (study.startDate !== null) {
        return "스터디 진행중";
      }
    }
  });

  const numberToDay = (num) => {
    if (num === 1) {
      return "월";
    }
    if (num === 2) {
      return "화";
    }
    if (num === 3) {
      return "수";
    }
    if (num === 4) {
      return "목";
    }
    if (num === 5) {
      return "금";
    }
    if (num === 6) {
      return "토";
    }
    if (num === 7) {
      return "일";
    }
  };

  const [selectedStudy, setSelectedStudy] = useState("");
  useEffect(() => {
    if (myStudyData) {
      const selected = myStudyData.filter((seq) => seq.studySeq === studySeq);
      setSelectedStudy(() => selected[0]);
    }
  }, [studySeq]);

  return (
    <div className="settings-study">
      <div className="settings-study-heading">
        <div className="settings-study-heading__h1">모집중인 스터디</div>
        <div className="settings-study-heading__h2">
          내가 모집중인 스터디 정보를 확인하고 관리할 수 있습니다
        </div>
      </div>

      <div className="settings-study-mystudies">
        <table>
          <tbody>
            {myStudyData &&
              myStudyData.map((study) => (
                <tr
                  key={study.studySeq}
                  className={`settings-study-mystudy ${
                    checkStudyStatus(study) === "모집중"
                      ? "not-check"
                      : "is-check"
                  } `}
                >
                  <td className="settings-study-mystudy-category">
                    {study.categoryName}
                  </td>
                  <td
                    className="settings-study-mystudy-title"
                    onClick={() => {
                      setShowStudyDetail(true);
                      setStudySeq(study.studySeq);
                    }}
                  >
                    <div className="mystudy-title">{study.title}</div>
                    <div className="mystudy-shorts">
                      {study.shortDescription}
                    </div>
                  </td>
                  <td className="settings-study-mystudy-status">
                    {checkStudyStatus(study)}
                  </td>
                  <td className="settings-study-mystudy-members">
                    {study.memberList.length}/6
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showStudyDetail && (
        <div className="settings-study-details">
          <div className="settings-study-details-box-heading">
            <div className="settings-study-details-box-heading__first">
              {selectedStudy && (
                <div className="settings-study-details-box-heading__title">
                  {selectedStudy.title}
                </div>
              )}
              {selectedStudy && (
                <div className="settings-study-details-box-heading__category">
                  {selectedStudy.categoryName}
                </div>
              )}
            </div>
            <div className="settings-study-details-box-heading__first-host">
              {/* [TODO]: update, delete 페이지로 링크 필요 */}
              <Link
                to={"/"}
                className="settings-study-details-box-heading__first-host-btn update"
              >
                수정
              </Link>
              <Link
                to={"/"}
                className="settings-study-details-box-heading__first-host-btn"
              >
                삭제
              </Link>
            </div>
          </div>
          <div className="settings-study-details-box-heading__second">
            {selectedStudy && (
              <div className="settings-study-details-img-wrapper">
                <svg
                  className="settings-study-details-img"
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
                {selectedStudy.hostImg !== null && (
                  <img
                    className="settings-study-details-img"
                    src={imageURL}
                    alt=""
                  />
                )}
              </div>
            )}
            {selectedStudy && (
              <div className="settings-study-details-box-heading__nickname">
                {selectedStudy.hostName}
              </div>
            )}
          </div>
          <hr></hr>
          <div className="settings-study-details-box-body">
            <div className="settings-study-details-box-body__time">
              <table>
                <tbody>
                  <tr className="settings-study-details-box-body__row">
                    <td className="settings-study-details-box-body__title">
                      스터디 일정
                    </td>
                    {selectedStudy.days &&
                      selectedStudy.days.map((day) => (
                        <td key={day.dayNumber}>
                          <div className="settings-study-details-box-body__days">
                            <div className="settings-study-details-box-body__day name">
                              {numberToDay(day.dayNumber)}
                            </div>
                            <div className="settings-study-details-box-body__day timestart">
                              {day.startTime.slice(0, 5)} ~{" "}
                            </div>
                            <div className="settings-study-details-box-body__day timeend">
                              {day.endTime.slice(0, 5)}
                            </div>
                          </div>
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr className="settings-study-details-box-body__row">
                    <td className="settings-study-details-box-body__title">
                      모집 기간
                    </td>
                    {selectedStudy && (
                      <td className="settings-study-details-box-body__enddate">
                        {selectedStudy.recruitStartDate} ~
                        {selectedStudy.recruitEndDate}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            {selectedStudy && (
              <div className="settings-study-details-box-body__shortdesc">
                {selectedStudy.shortDescription}
              </div>
            )}
            {selectedStudy && (
              <div className="settings-study-details-box-body__desc">
                {selectedStudy.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
