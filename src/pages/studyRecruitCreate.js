import { useState } from "react";
import StudyDatePicker from "../components/datepicker";
import StudyDatePickerStart from "../components/datepickerStart";
import TimePicker from "../components/timepicker";
import "../statics/css/studyRecruitCreate.css";

export default function StudyRecruitCreate() {
  // [TODO]: studies api 완성되면 어떤 데이터를 post 해야하는지 보고 아래의 함수 완성하기
  // const [studyRecruit, setStudyRecruit] = useState({

  // })
  const [days, setDays] = useState([]);
  const [mondayTimeData, setMondayTimeData] = useState(0);
  const [isMonday, setIsMonday] = useState(false);
  const onClickIsMonday = (event) => {
    event.preventDefault();
    setIsMonday(!isMonday);

    if (!isMonday) {
      setDays((days) => [...days, 0]);
      openModal();
    }
  };
  const [isTuesday, setIsTuesday] = useState(false);
  const onClickIsTuesday = () => {
    setIsTuesday(!isTuesday);
    if (!isTuesday) {
      setDays((days) => [...days, 0]);
      openModal();
    }
  };
  const [isWednesday, setIsWednesday] = useState(false);
  const onClickIsWednesday = () => {
    setIsWednesday(!isWednesday);
  };
  const [isThursday, setIsThursday] = useState(false);
  const onClickIsThursday = () => {
    setIsThursday(!isThursday);
  };
  const [isFriday, setIsFriday] = useState(false);
  const onClickIsFriday = () => {
    setIsFriday(!isFriday);
  };
  const [isSaturday, setIsSaturday] = useState(false);
  const onClickIsSaturday = () => {
    setIsSaturday(!isSaturday);
  };
  const [isSunday, setIsSunday] = useState(false);
  const onClickIsSunday = () => {
    setIsSunday(!isSunday);
  };

  // 시간 설정 모달창
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="recruit-create">
      <div className="recruit-create-heading">
        <span>스터디 모집하기</span>
      </div>
      <div className="recruit-create-contents">
        <div className="recruit-create-content">
          <table className="recruit-create-content-category">
            <tbody>
              <tr>
                <td className="recruit-create-content-row a1">카테고리</td>
                <td>
                  <select></select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recruit-create-content">
          <table>
            <tbody>
              <tr>
                <td className="recruit-create-content-row a1">스터디 이름</td>
                <td className="recruit-create-content-row a2">
                  <input
                    className="recruit-input"
                    placeholder="스터디 이름을 입력하세요"
                  />
                </td>
              </tr>
              <tr>
                <td className="recruit-create-content-row a1">한줄 소개</td>
                <td className="recruit-create-content-row a2">
                  <input
                    className="recruit-input"
                    placeholder="간단한 소개를 작성해주세요"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recruit-create-content">
          <table className="recruit-create-content__day">
            <tbody>
              <tr>
                <td className="recruit-create-content-row a1">스터디 요일</td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    className={`recruit-create-content-row day-name ${
                      isMonday ? "selected" : ""
                    }`}
                    onClick={onClickIsMonday}
                  >
                    Mon
                  </button>
                  <TimePicker
                    open={modalOpen}
                    close={closeModal}
                    setTimeData={setMondayTimeData}
                  ></TimePicker>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    className={`recruit-create-content-row day-name ${
                      isTuesday ? "selected" : ""
                    }`}
                    onClick={onClickIsTuesday}
                  >
                    Tue
                  </button>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    className={`recruit-create-content-row day-name ${
                      isWednesday ? "selected" : ""
                    }`}
                    onClick={onClickIsWednesday}
                  >
                    Wed
                  </button>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    className={`recruit-create-content-row day-name ${
                      isThursday ? "selected" : ""
                    }`}
                    onClick={onClickIsThursday}
                  >
                    Thu
                  </button>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    className={`recruit-create-content-row day-name ${
                      isFriday ? "selected" : ""
                    }`}
                    onClick={onClickIsFriday}
                  >
                    Fri
                  </button>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    className={`recruit-create-content-row day-name ${
                      isSaturday ? "selected" : ""
                    }`}
                    onClick={onClickIsSaturday}
                  >
                    Sat
                  </button>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    className={`recruit-create-content-row day-name ${
                      isSunday ? "selected" : ""
                    }`}
                    onClick={onClickIsSunday}
                  >
                    Sun
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td className="recruit-create-content-row a1">모집 기간</td>
                <td className="recruit-create-content-row date">시작일</td>
                <td className="recruit-create-content-row a3">
                  <StudyDatePickerStart />
                </td>
                <td className="recruit-create-content-row date">종료일</td>
                <td className="recruit-create-content-row a3">
                  <StudyDatePicker />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recruit-create-content">
          <div className="recruit-create-content-description">
            <span>스터디 소개</span>
            <textarea
              placeholder="스터디 모집 사항을 상세히 적어주세요"
              maxLength={1000}
            ></textarea>
          </div>
        </div>
      </div>
      <center>
        <button>스터디 개설</button>
      </center>
    </div>
  );
}
