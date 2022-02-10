import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import StudyDatePicker from "../components/datepicker";
import StudyDatePickerStart from "../components/datepickerStart";
import TimePicker from "../components/timepicker";
import CategorySelect from "../components/categorySelect";
import isLogin from "../utils/isLogin";

import "../statics/css/studyRecruitCreate.css";
import Modal from "../components/modal";

export default function StudyRecruitCreate() {
  const [mondayStartTime, setMondayStartTime] =
    useState('');
  const [mondayEndTime, setMondayEndTime] = useState('');
  const [isMonday, setIsMonday] = useState(false);
  const [monday, setMonday] = useState({
    dayNumber: 0,
    timeStart: '',
    timeEnd: '',
  });
  useMemo(() => {
    if (isMonday) {
      setMonday((prevState) => ({
        ...prevState,
        dayNumber: 1,
        timeStart: mondayStartTime,
        timeEnd: mondayEndTime,
      }));
    }
  }, [mondayEndTime, mondayStartTime]);

  const [tuesdayStartTime, setTuesdayStartTime] =
    useState('');
  const [tuesdayEndTime, setTuesdayEndTime] = useState('');
  const [isTuesday, setIsTuesday] = useState(false);
  const [tuesday, setTuesday] = useState({
    dayNumber: 0,
    timeStart: '',
    timeEnd: '',
  });
  useMemo(() => {
    if (isTuesday) {
      setTuesday((prevState) => ({
        ...prevState,
        dayNumber: 2,
        timeStart: tuesdayStartTime,
        timeEnd: tuesdayEndTime,
      }));
    }
  }, [tuesdayEndTime, tuesdayStartTime]);

  const [wednesdayStartTime, setWednesdayStartTime] =
    useState('');
  const [wednesdayEndTime, setWednesdayEndTime] =
    useState('');
  const [isWednesday, setIsWednesday] = useState(false);
  const [wednesday, setWednesday] = useState({
    dayNumber: 0,
    timeStart: '',
    timeEnd: '',
  });
  useMemo(() => {
    if (isWednesday) {
      setWednesday((prevState) => ({
        ...prevState,
        dayNumber: 3,
        timeStart: wednesdayStartTime,
        timeEnd: wednesdayEndTime,
      }));
    }
  }, [wednesdayEndTime, wednesdayStartTime]);

  const [thursdayStartTime, setThursdayStartTime] =
    useState('');
  const [thursdayEndTime, setThursdayEndTime] =
    useState('');
  const [isThursday, setIsThursday] = useState(false);
  const [thursday, setThursday] = useState({
    dayNumber: 0,
    timeStart: '',
    timeEnd: '',
  });
  useMemo(() => {
    if (isThursday) {
      setThursday((prevState) => ({
        ...prevState,
        dayNumber: 4,
        timeStart: thursdayStartTime,
        timeEnd: thursdayEndTime,
      }));
    }
  }, [thursdayEndTime, thursdayStartTime]);

  const [fridayStartTime, setFridayStartTime] =
    useState('');
  const [fridayEndTime, setFridayEndTime] = useState('');
  const [isFriday, setIsFriday] = useState(false);
  const [friday, setFriday] = useState({
    dayNumber: 0,
    timeStart: '',
    timeEnd: '',
  });
  useMemo(() => {
    if (isFriday) {
      setFriday((prevState) => ({
        ...prevState,
        dayNumber: 5,
        timeStart: fridayStartTime,
        timeEnd: fridayEndTime,
      }));
    }
  }, [fridayEndTime, fridayStartTime]);

  const [saturdayStartTime, setSaturdayStartTime] =
    useState('');
  const [saturdayEndTime, setSaturdayEndTime] =
    useState('');
  const [isSaturday, setIsSaturday] = useState(false);
  const [saturday, setSaturday] = useState({
    dayNumber: 0,
    timeStart: '',
    timeEnd: '',
  });
  useMemo(() => {
    if (isSaturday) {
      setSaturday((prevState) => ({
        ...prevState,
        dayNumber: 6,
        timeStart: saturdayStartTime,
        timeEnd: saturdayEndTime,
      }));
    }
  }, [saturdayEndTime, saturdayStartTime]);

  const [sundayStartTime, setSundayStartTime] =
    useState('');
  const [sundayEndTime, setSundayEndTime] = useState('');
  const [isSunday, setIsSunday] = useState(false);
  const [sunday, setSunday] = useState({
    dayNumber: 7,
    timeStart: '',
    timeEnd: '',
  });
  useMemo(() => {
    if (isSunday) {
      setSunday((prevState) => ({
        ...prevState,
        dayNumber: 7,
        timeStart: sundayStartTime,
        timeEnd: sundayEndTime,
      }));
    }
  }, [sundayEndTime, sundayStartTime]);

  const [modalOpenMon, setModalOpenMon] = useState(false);
  const [modalOpenTue, setModalOpenTue] = useState(false);
  const [modalOpenWed, setModalOpenWed] = useState(false);
  const [modalOpenThu, setModalOpenThu] = useState(false);
  const [modalOpenFri, setModalOpenFri] = useState(false);
  const [modalOpenSat, setModalOpenSat] = useState(false);
  const [modalOpenSun, setModalOpenSun] = useState(false);

  const openModalMon = () => {
    setModalOpenMon(true);
  };
  const closeModalMon = () => {
    setModalOpenMon(false);
  };
  const openModalTue = () => {
    setModalOpenTue(true);
  };
  const closeModalTue = () => {
    setModalOpenTue(false);
  };
  const openModalWed = () => {
    setModalOpenWed(true);
  };
  const closeModalWed = () => {
    setModalOpenWed(false);
  };
  const openModalThu = () => {
    setModalOpenThu(true);
  };
  const closeModalThu = () => {
    setModalOpenThu(false);
  };
  const openModalFri = () => {
    setModalOpenFri(true);
  };
  const closeModalFri = () => {
    setModalOpenFri(false);
  };
  const openModalSat = () => {
    setModalOpenSat(true);
  };
  const closeModalSat = () => {
    setModalOpenSat(false);
  };
  const openModalSun = () => {
    setModalOpenSun(true);
  };
  const closeModalSun = () => {
    setModalOpenSun(false);
  };

  const [userSeq, setUserSeq] = useState("");
  const [studyTitle, setStudyTitle] = useState("");
  const [studyShortDesc, setStudyShotrDesc] = useState("");
  const [studyDesc, setStudyDesc] = useState("");
  const [studyRecruitEnd, setStudyRecruitEnd] = useState("");
  const [categorySeq, setCategorySeq] = useState(0);

  // [TODO]: 스터디 상세정보 글자수 실시간으로 보여주기 (1000자 제한)
  const onChangeStudyDesc = useCallback((event) => {
    setStudyDesc(event.target.value);
  });

  const [days, setDays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin()) {
      const TOKEN = localStorage.getItem("accessToken");
      axios
        .get(process.env.REACT_APP_SERVER_URL + '/users', {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          setUserSeq(res.data.user.userSeq);
        });
    }
  }, []);

  function onRemove(id) {
    setDays(days.filter((days) => days.dayNumber !== id));
  }

  useEffect(() => {
    if (isMonday) {
      onRemove(1);
      setDays((days) => [...days, monday]);
    } else if (!isMonday) {
      onRemove(1);
    }
  }, [isMonday, monday]);
  useEffect(() => {
    if (isTuesday) {
      onRemove(2);
      setDays((days) => [...days, tuesday]);
    } else if (!isTuesday) {
      onRemove(2);
    }
  }, [isTuesday, tuesday]);

  useEffect(() => {
    if (isWednesday) {
      onRemove(3);
      setDays((days) => [...days, wednesday]);
    } else if (!isWednesday) {
      onRemove(3);
    }
  }, [isWednesday, wednesday]);

  useEffect(() => {
    if (isThursday) {
      onRemove(4);
      setDays((days) => [...days, thursday]);
    } else if (!isThursday) {
      onRemove(4);
    }
  }, [isThursday, thursday]);
  useEffect(() => {
    if (isFriday) {
      onRemove(5);
      setDays((days) => [...days, friday]);
    } else if (!isFriday) {
      onRemove(5);
    }
  }, [isFriday, friday]);
  useEffect(() => {
    if (isSaturday) {
      onRemove(6);
      setDays((days) => [...days, saturday]);
    } else if (!isSaturday) {
      onRemove(6);
    }
  }, [isSaturday, saturday]);
  useEffect(() => {
    if (isSunday) {
      onRemove(7);
      setDays((days) => [...days, sunday]);
    } else if (!isSunday) {
      onRemove(7);
    }
  }, [isSunday, sunday]);

  // console.log(
  //   userSeq,
  //   typeof Number(categorySeq),
  //   Number(categorySeq),
  //   studyTitle,
  //   studyShortDesc,
  //   studyDesc,
  //   studyRecruitEnd,
  //   days,
  //   studyDesc.length
  // );
  // console.log("mon", mondayStartTime, mondayEndTime, isMonday, monday);
  // console.log("tue", tuesdayStartTime, tuesdayEndTime, isTuesday, tuesday);
  // console.log(
  //   "wed",
  //   wednesdayStartTime,
  //   wednesdayEndTime,
  //   isWednesday,
  //   wednesday
  // );
  // console.log("thu", thursdayStartTime, thursdayEndTime, isThursday, thursday);
  // console.log("fri", fridayStartTime, fridayEndTime, isFriday, friday);
  // console.log("sat", saturdayStartTime, saturdayEndTime, isSaturday, saturday);
  // console.log("sun", sundayStartTime, sundayEndTime, isSunday, sunday);

  const [errorCode, setErrorCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const onSubmitStudy = useCallback(() => {
    const TOKEN = localStorage.getItem("accessToken");
    axios
      .post(
        process.env.REACT_APP_SERVER_URL + '/studies',
        {
          hostSea: userSeq,
          categorySeq: Number(categorySeq),
          studyTitle: studyTitle,
          studyShortDesc: studyShortDesc,
          studyDesc: studyDesc,
          studyRecruitEnd: studyRecruitEnd,
          day: days,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.statusCode === 200) {
          navigate("/studyrecruit");
        } else if (res.data.statusCode === 406) {
          setErrorCode(406);
          openModal();
        } else if (res.data.statusCode === 407) {
          setErrorCode(407);
          openModal();
        } else if (res.data.statusCode === 408) {
          setErrorCode(408);
          openModal();
        }
      });
  }, [
    userSeq,
    categorySeq,
    studyTitle,
    studyShortDesc,
    studyDesc,
    studyRecruitEnd,
    days,
  ]);

  // console.log(days);
  // console.log(categorySeq);
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
                <td className="recruit-create-content-row a1">
                  카테고리
                </td>
                <td>
                  <CategorySelect
                    categoryseq={setCategorySeq}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recruit-create-content">
          <table>
            <tbody>
              <tr>
                <td className="recruit-create-content-row a1">
                  스터디 이름
                </td>
                <td className="recruit-create-content-row a2">
                  <input
                    className="recruit-input"
                    maxLength="50"
                    placeholder="스터디 이름을 입력하세요"
                    onChange={useCallback((event) => {
                      setStudyTitle(event.target.value);
                    })}
                  />
                </td>
              </tr>
              <tr>
                <td className="recruit-create-content-row a1">
                  한줄 소개
                </td>
                <td className="recruit-create-content-row a2">
                  <input
                    className="recruit-input"
                    maxLength="50"
                    placeholder="간단한 소개를 작성해주세요"
                    onChange={useCallback((event) => {
                      setStudyShotrDesc(event.target.value);
                    })}
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
                <td className="recruit-create-content-row a1">
                  스터디 요일
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    data-tip
                    data-for="tooltip-mon"
                    className={`recruit-create-content-row day-name ${
                      isMonday ? 'selected' : ''
                    } `}
                    onClick={openModalMon}
                  >
                    Mon
                  </button>
                  {isMonday && (
                    <ReactTooltip
                      id="tooltip-mon"
                      className="tooltip-day"
                      place="top"
                      effect="solid"
                    >
                      {mondayStartTime.substring(0, 5)} ~{' '}
                      {mondayEndTime.substring(0, 5)}
                    </ReactTooltip>
                  )}
                  <TimePicker
                    open={modalOpenMon}
                    close={closeModalMon}
                    startTimeData={mondayStartTime}
                    endTimeData={mondayEndTime}
                    setStartTimeData={setMondayStartTime}
                    setEndTimeData={setMondayEndTime}
                    setIsDay={setIsMonday}
                  ></TimePicker>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    data-tip
                    data-for="tooltip-tue"
                    className={`recruit-create-content-row day-name ${
                      isTuesday ? 'selected' : ''
                    }`}
                    onClick={openModalTue}
                  >
                    Tue
                  </button>
                  {isTuesday && (
                    <ReactTooltip
                      id="tooltip-tue"
                      className="tooltip-day"
                      place="top"
                      effect="solid"
                    >
                      {tuesdayStartTime.substring(0, 5)} ~{' '}
                      {tuesdayEndTime.substring(0, 5)}
                    </ReactTooltip>
                  )}
                  <TimePicker
                    open={modalOpenTue}
                    close={closeModalTue}
                    startTimeData={tuesdayStartTime}
                    endTimeData={tuesdayEndTime}
                    setStartTimeData={setTuesdayStartTime}
                    setEndTimeData={setTuesdayEndTime}
                    setIsDay={setIsTuesday}
                  ></TimePicker>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    data-tip
                    data-for="tooltip-wed"
                    className={`recruit-create-content-row day-name ${
                      isWednesday ? 'selected' : ''
                    }`}
                    onClick={openModalWed}
                  >
                    Wed
                  </button>
                  {isWednesday && (
                    <ReactTooltip
                      id="tooltip-wed"
                      className="tooltip-day"
                      place="top"
                      effect="solid"
                    >
                      {wednesdayStartTime.substring(0, 5)} ~{' '}
                      {wednesdayEndTime.substring(0, 5)}
                    </ReactTooltip>
                  )}
                  <TimePicker
                    open={modalOpenWed}
                    close={closeModalWed}
                    startTimeData={wednesdayStartTime}
                    endTimeData={wednesdayEndTime}
                    setStartTimeData={setWednesdayStartTime}
                    setEndTimeData={setWednesdayEndTime}
                    setIsDay={setIsWednesday}
                  ></TimePicker>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    data-tip
                    data-for="tooltip-thu"
                    className={`recruit-create-content-row day-name ${
                      isThursday ? 'selected' : ''
                    }`}
                    onClick={openModalThu}
                  >
                    Thu
                  </button>
                  {isThursday && (
                    <ReactTooltip
                      id="tooltip-thu"
                      className="tooltip-day"
                      place="top"
                      effect="solid"
                    >
                      {thursdayStartTime.substring(0, 5)} ~{' '}
                      {thursdayEndTime.substring(0, 5)}
                    </ReactTooltip>
                  )}
                  <TimePicker
                    open={modalOpenThu}
                    close={closeModalThu}
                    startTimeData={thursdayStartTime}
                    endTimeData={thursdayEndTime}
                    setStartTimeData={setThursdayStartTime}
                    setEndTimeData={setThursdayEndTime}
                    setIsDay={setIsThursday}
                  ></TimePicker>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    data-tip
                    data-for="tooltip-fri"
                    className={`recruit-create-content-row day-name ${
                      isFriday ? 'selected' : ''
                    }`}
                    onClick={openModalFri}
                  >
                    Fri
                  </button>
                  {isFriday && (
                    <ReactTooltip
                      id="tooltip-fri"
                      className="tooltip-day"
                      place="top"
                      effect="solid"
                    >
                      {fridayStartTime.substring(0, 5)} ~{' '}
                      {fridayEndTime.substring(0, 5)}
                    </ReactTooltip>
                  )}
                  <TimePicker
                    open={modalOpenFri}
                    close={closeModalFri}
                    startTimeData={fridayStartTime}
                    endTimeData={fridayEndTime}
                    setStartTimeData={setFridayStartTime}
                    setEndTimeData={setFridayEndTime}
                    setIsDay={setIsFriday}
                  ></TimePicker>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    data-tip
                    data-for="tooltip-sat"
                    className={`recruit-create-content-row day-name ${
                      isSaturday ? 'selected' : ''
                    }`}
                    onClick={openModalSat}
                  >
                    Sat
                  </button>
                  {isSaturday && (
                    <ReactTooltip
                      id="tooltip-sat"
                      className="tooltip-day"
                      place="top"
                      effect="solid"
                    >
                      {saturdayStartTime.substring(0, 5)} ~{' '}
                      {saturdayEndTime.substring(0, 5)}
                    </ReactTooltip>
                  )}
                  <TimePicker
                    open={modalOpenSat}
                    close={closeModalSat}
                    startTimeData={saturdayStartTime}
                    endTimeData={saturdayEndTime}
                    setStartTimeData={setSaturdayStartTime}
                    setEndTimeData={setSaturdayEndTime}
                    setIsDay={setIsSaturday}
                  ></TimePicker>
                </td>
                <td className="recruit-create-content-row day">
                  <button
                    id="day-picker"
                    data-tip
                    data-for="tooltip-sun"
                    className={`recruit-create-content-row day-name ${
                      isSunday ? 'selected' : ''
                    }`}
                    onClick={openModalSun}
                  >
                    Sun
                  </button>
                  {isSunday && (
                    <ReactTooltip
                      id="tooltip-sun"
                      className="tooltip-day"
                      place="top"
                      effect="solid"
                    >
                      {sundayStartTime.substring(0, 5)} ~{' '}
                      {sundayEndTime.substring(0, 5)}
                    </ReactTooltip>
                  )}
                  <TimePicker
                    open={modalOpenSun}
                    close={closeModalSun}
                    startTimeData={sundayStartTime}
                    endTimeData={sundayEndTime}
                    setStartTimeData={setSundayStartTime}
                    setEndTimeData={setSundayEndTime}
                    setIsDay={setIsSunday}
                  ></TimePicker>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td className="recruit-create-content-row a1">
                  모집 기간
                </td>
                <td className="recruit-create-content-row date">
                  시작일
                </td>
                <td className="recruit-create-content-row a3">
                  <StudyDatePickerStart />
                </td>
                <td className="recruit-create-content-row date">
                  종료일
                </td>
                <td className="recruit-create-content-row a3">
                  <StudyDatePicker
                    endDate={setStudyRecruitEnd}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recruit-create-content">
          <div className="recruit-create-content-description">
            <div className="recruit-create-content-description__title">
              <span>스터디 소개</span>
              <span className="recruit-create-content-description__title-length">
                {studyDesc.length}/1000
              </span>
            </div>
            <textarea
              type="text"
              placeholder="스터디 모집 사항을 상세히 적어주세요"
              maxLength={1000}
              onChange={onChangeStudyDesc}
            ></textarea>
          </div>
        </div>
      </div>
      <center>
        <button onClick={onSubmitStudy}>스터디 개설</button>
      </center>
      <Modal open={modalOpen} close={closeModal} header=" ">
        <div>
          <span className="recuit-create-alert">!</span>
          {errorCode === 408 && (
            <span className="recruit-create-errormsg">
              스터디 요일과 시간을 설정해주세요
            </span>
          )}
          {errorCode === 406 && (
            <span className="recruit-create-errormsg">
              카테고리를 선택해주세요
            </span>
          )}
          {errorCode === 407 && (
            <span className="recruit-create-errormsg">
              입력되지 않은 항목이 있습니다
            </span>
          )}
        </div>
        <button className="recruit-create-errorbtn" onClick={closeModal}>
          확인
        </button>
      </Modal>
    </div>
  );
}
