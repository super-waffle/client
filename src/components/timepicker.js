import React, { useState } from "react";
import "../statics/css/timepicker.css";

const TimePicker = (props) => {
  const HOURS = [
    { value: "00", name: "00" },
    { value: "01", name: "01" },
    { value: "02", name: "02" },
    { value: "03", name: "03" },
    { value: "04", name: "04" },
    { value: "05", name: "05" },
    { value: "06", name: "06" },
    { value: "07", name: "07" },
    { value: "08", name: "08" },
    { value: "09", name: "09" },
    { value: "10", name: "10" },
    { value: "11", name: "11" },
    { value: "12", name: "12" },
    { value: "13", name: "13" },
    { value: "14", name: "14" },
    { value: "15", name: "15" },
    { value: "16", name: "16" },
    { value: "17", name: "17" },
    { value: "18", name: "18" },
    { value: "19", name: "19" },
    { value: "20", name: "20" },
    { value: "21", name: "21" },
    { value: "22", name: "22" },
    { value: "23", name: "23" },
    { value: "24", name: "24" },
  ];
  const MINUTES = [
    { value: "00", name: "00" },
    { value: "10", name: "10" },
    { value: "20", name: "20" },
    { value: "30", name: "30" },
    { value: "40", name: "40" },
    { value: "50", name: "50" },
  ];

  const [startTime, setStartTime] = useState("12");
  const [startMinute, setStartMinute] = useState("00");
  const [finTime, setFinTime] = useState("12");
  const [finMinute, setFinMinute] = useState("00");
  const onChangeStartHour = (e) => {
    setStartTime(e.target.value);
  };
  const onChangeStartMin = (e) => {
    setStartMinute(e.target.value);
  };
  const onChangeFinTime = (e) => {
    setFinTime(e.target.value);
  };
  const onChangeFinMin = (e) => {
    setFinMinute(e.target.value);
  };
  console.log(startTime, startMinute, finTime, finMinute);

  // 시간, 분 선택 옵션
  const SelectBox = (props) => {
    console.log(typeof Number(startTime));
    console.log(Number(startTime));
    const tmpStartTime = Number(startTime);
    // console.log(props);
    return (
      <select value={props.value} onChange={props.onChange}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };
  const SelectBoxFinTime = (props) => {
    // console.log(typeof Number(startTime));
    // console.log(Number(startTime));
    const tmpStartTime = Number(startTime);
    console.log(tmpStartTime);
    // console.log(props);
    return (
      <select value={props.value} onChange={props.onChange}>
        {props.options.map((option) => {
          tmpStartTime < Number(option.value) && (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    );
  };
  const { open, close, header } = props;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <svg
              className="close"
              onClick={close}
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="0.707153"
                width="1"
                height="10"
                rx="0.5"
                transform="rotate(-45 0 0.707153)"
                fill="#bababa"
              />
              <rect
                x="7.07129"
                width="1"
                height="10"
                rx="0.5"
                transform="rotate(45 7.07129 0)"
                fill="#bababa"
              />
            </svg>
          </header>
          <main>
            <div className="main-heading">스터디 시간 설정</div>
            <div className="main-body-select">
              <span className="main-body-title">시작시간</span>
              <SelectBox
                options={HOURS}
                value={startTime}
                onChange={onChangeStartHour}
              ></SelectBox>
              <span className="main-body-time">시</span>
              <SelectBox
                options={MINUTES}
                value={startMinute}
                onChange={onChangeStartMin}
              ></SelectBox>
              <span className="main-body-time">분</span>
            </div>
            <div className="main-body-select">
              <span className="main-body-title">종료시간</span>
              <SelectBox
                options={HOURS}
                value={finTime}
                onChange={onChangeFinTime}
              ></SelectBox>
              <span className="main-body-time">시</span>
              <SelectBox
                options={MINUTES}
                value={finMinute}
                onChange={onChangeFinMin}
              ></SelectBox>
              <span className="main-body-time">분</span>
            </div>
            <button className="main-footer" onClick={close}>
              설정 완료
            </button>
          </main>
        </section>
      ) : null}
    </div>
  );
};
export default TimePicker;
