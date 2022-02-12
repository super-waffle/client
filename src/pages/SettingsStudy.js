import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "../statics/css/settingsStudy.css";

export default function SettingsStudy() {
  const TOKEN = localStorage.getItem("accessToken");
  const [nickname, setNickname] = useState("");
  const [myStudyData, setMyStudyData] = useState("");
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
        // console.log(res.data);
        const USER = res.data.user;
        setNickname(USER.userNickname);
      });
  }, []);
  console.log(myStudyData);

  // 스터디 모집중인지 진행중인지 모집마감인지 스터디 종료인지 판단
  const [studyStatus, setStudyStatus] = useState("");
  const checkStudyStatus = useCallback((study) => {
    if (nickname === study.hostName) {
      if (study.isRecruiting && study.startDate === null) {
        // setStudyStatus("모집중");
        return "모집중";
      }
      if (!study.isRecruiting && study.startData !== null) {
        // setStudyStatus("모집중");
        return "모집마감";
      }
      if (study.startDate !== null) {
        // setStudyStatus("모집중");
        return "스터디 진행중";
      }
    }
  });
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
                  <td className="settings-study-mystudy-title">
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
    </div>
  );
}
