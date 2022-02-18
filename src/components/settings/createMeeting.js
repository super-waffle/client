import { useState } from "react";
import axios from "axios";
import CategorySelect from "../categorySelect";
import "../../statics/css/settings/createMeeting.css";

export default function CreateMeeting({ setIsExist, setWantEdit }) {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [category, setCategory] = useState("");
  const [meetingDesc, setMeetingDesc] = useState("");
  const onCreateMeeting = async () => {
    var data = new FormData();
    data.append("CategorySeq", category);
    data.append("meetingTitle", meetingTitle);
    data.append("meetingDesc", meetingDesc);
    data.append("meetingCamType", 0);
    data.append("meetingMicType", 0);
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/meetings", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setIsExist(true);
        setWantEdit(false);
      });
  };
  return (
    <div className="setting-meeting-header">
      <div className="settings-meeting-heading">
        <div className="settings-meeting-heading__h1">자유열람실 생성</div>
        <div className="settings-meeting-heading__h2">
          나만의 규칙으로 새로운 자유열람실을 만들어보세요
        </div>
      </div>

      <table>
        <tbody>
          <tr className="create-meeting__table-row">
            <td className="create-meeting-row a1">카테고리</td>
            <td className="create-meeting-row a2">
              {setCategory && <CategorySelect categoryseq={setCategory} />}
            </td>
          </tr>
          <tr>
            <td className="create-meeting-row a1">자유열람실 이름</td>
            <td className="create-meeting-row a2">
              <input
                type="text"
                defaultValue={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="자유열람실 이름을 입력하세요"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="create-meeting-desc">
        <div className="create-meeting-row a1 meeting-desc">
          자유열람실 설명
        </div>
        <textarea
          type="text"
          defaultValue={meetingDesc}
          onChange={(e) => setMeetingDesc(e.target.value)}
          placeholder="내 자유열람실에 대해 자세하게 소개해주세요"
        ></textarea>
      </div>
      <center>
        <button className="create-meeting-btn" onClick={onCreateMeeting}>
          자유열람실 생성
        </button>
      </center>
    </div>
  );
}
