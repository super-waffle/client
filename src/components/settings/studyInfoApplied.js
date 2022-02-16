import { Link } from "react-router-dom";
import axios from "axios";
import "../../statics/css/settings/studyInfoApplied.css";

export default function StudyInfoApplied({
  selectedStudy,
  imageURL,
  nickname,
  setStudyList,
}) {
  const TOKEN = localStorage.getItem("accessToken");
  const weekend = ["월", "화", "수", "목", "금", "토", "일"];
  const endStudy = () => {
    axios
      .patch(
        process.env.REACT_APP_SERVER_URL +
          `/users/studies/${selectedStudy.studySeq}/end`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setStudyList((studies) =>
          studies.filter((study) => study.studySeq !== selectedStudy.studySeq)
        );
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          alert("존재하지 않는 스터디 입니다");
        } else {
          alert("스터디의 호스트가 아닙니다");
        }
      });
  };
  const quitStudy = () => {
    axios
      .patch(
        process.env.REACT_APP_SERVER_URL +
          `/users/studies/${selectedStudy.studySeq}/quit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setStudyList((studies) =>
          studies.filter((study) => study.studySeq !== selectedStudy.studySeq)
        );
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          alert("존재하지 않는 스터디 입니다");
        } else {
          alert("스터디의 호스트입니다");
        }
      });
  };

  return (
    <div className="settings-study-details">
      <div className="settings-study-details-box-heading">
        <div className="settings-study-details-box-heading__first">
          <div className="settings-study-details-box-heading__title">
            {selectedStudy.title}
          </div>
          <div className="settings-study-details-box-heading__category">
            {selectedStudy.categoryName}
          </div>
        </div>
        {selectedStudy.hostName === nickname && (
          <div className="settings-study-details-box-heading__first-host">
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
        )}
      </div>
      <div className="settings-study-details-box-heading__second">
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
          {selectedStudy.hostImage && (
            <img className="settings-study-details-img" src={imageURL} alt="" />
          )}
        </div>
        <div className="settings-study-details-box-heading__nickname">
          {selectedStudy.hostName}
        </div>
      </div>
      <hr></hr>
      <div className="settings-study-details-box-body">
        <div className="settings-study-details-box-body__time">
          <table>
            <tbody>
              <tr className="settings-study-details-box-body__row">
                <td className="settings-study-details-box-body__title">
                  스터디 인원
                </td>
                {selectedStudy.memberList &&
                  selectedStudy.memberList.map((member) => (
                    <td key={member.userSeq}>
                      <div className="study-info-applied__members">
                        <div className="study-info-applied__img-wrapper">
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
                          {member.userImage !== null && (
                            <img
                              className="settings-study-details-img"
                              src={`https://i6a301.p.ssafy.io:8080/images/${member.userImage}`}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="settings-study-details-box-body__day">
                          {member.userNickname}
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
                  스터디 일정
                </td>
                {selectedStudy.days &&
                  selectedStudy.days.map((day) => (
                    <td key={day.dayNumber}>
                      <div className="settings-study-details-box-body__days">
                        <div className="settings-study-details-box-body__day name">
                          {weekend[day.dayNumber]}
                        </div>
                        <div className="settings-study-details-box-body__day timestart">
                          {day.startTime.slice(0, 5)} ~
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
                <td className="settings-study-details-box-body__enddate">
                  {selectedStudy.recruitStartDate} ~
                  {selectedStudy.recruitEndDate}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="settings-study-details-box-body__shortdesc">
          {selectedStudy.shortDescription}
        </div>
        <div className="settings-study-details-box-body__desc">
          {selectedStudy.description}
        </div>
      </div>
      {selectedStudy.isRecruiting && (
        <div className="settings-study-details__btns">
          {selectedStudy.hostName === nickname ? (
            <button
              className="settings-study-details__btn end-study"
              onClick={endStudy}
            >
              스터디 종료하기
            </button>
          ) : (
            <button
              className="settings-study-details__btn end-study"
              onClick={quitStudy}
            >
              스터디 탈퇴하기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
