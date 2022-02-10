import React, { forwardRef, useEffect, useState } from "react";
import { addDays } from "date-fns";

import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../statics/css/datepicker.css";

import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

export default function StudyDatePicker(props) {
  // 기본 설정 날짜는 오늘날짜 +7일로 설정해둠
  const [startDate, setStartDate] = useState(addDays(new Date(), 7));

  //yyyy-mm-dd 포맷 날짜 생성
  function changeDateFormat(d) {
    return (
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1 > 9
        ? (d.getMonth() + 1).toString()
        : "0" + (d.getMonth() + 1)) +
      "-" +
      (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString())
    );
  }
  useEffect(() => {
    props.endDate(changeDateFormat(startDate));
  }, [startDate]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // 버튼 커스텀
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <DatePicker
      locale="ko" // 달력 한국어로 바꾸기
      showPopperArrow={false} // 달력 위의 화살표 없애기
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={addDays(new Date(), 1)} // 오늘 이전의 날짜는 선택 불가능하도록 설정
      customInput={<CustomInput />}
      dateFormat="yyyy/MM/dd"
      // 달력 윗부분 디자인 바꾸기 (버튼, 월 이름, 배경 색상 등)
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="date-customerheader">
          <svg
            className="arrow"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.1414 1.75053L3.2549 5.73752C3.18664 5.80755 3.14844 5.90148 3.14844 5.99927C3.14844 6.09707 3.18664 6.19099 3.2549 6.26102L7.1414 10.2495C7.1732 10.2822 7.21121 10.3081 7.25321 10.3259C7.2952 10.3436 7.34032 10.3527 7.3859 10.3527C7.43148 10.3527 7.4766 10.3436 7.51859 10.3259C7.56059 10.3081 7.5986 10.2822 7.6304 10.2495C7.69582 10.1825 7.73244 10.0926 7.73244 9.99902C7.73244 9.9054 7.69582 9.81549 7.6304 9.74852L3.97565 5.99927L7.6304 2.25078C7.69559 2.18384 7.73207 2.09409 7.73207 2.00066C7.73207 1.90722 7.69559 1.81747 7.6304 1.75053C7.5986 1.71787 7.56059 1.69192 7.51859 1.67419C7.4766 1.65647 7.43148 1.64734 7.3859 1.64734C7.34032 1.64734 7.2952 1.65647 7.25321 1.67419C7.21121 1.69192 7.1732 1.71787 7.1414 1.75053V1.75053Z"
              fill="var(--textColor)"
            />
          </svg>
          <div className="custom-month">
            {months[date.getMonth()]}, {date.getFullYear()}
          </div>
          <svg
            className="arrow"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.99462 1.74978C3.9292 1.81675 3.89258 1.90666 3.89258 2.00028C3.89258 2.0939 3.9292 2.18381 3.99462 2.25078L7.64937 6.00002L3.99462 9.74852C3.9292 9.81549 3.89258 9.9054 3.89258 9.99902C3.89258 10.0926 3.9292 10.1825 3.99462 10.2495C4.02641 10.2822 4.06443 10.3081 4.10643 10.3259C4.14842 10.3436 4.19354 10.3527 4.23912 10.3527C4.2847 10.3527 4.32982 10.3436 4.37181 10.3259C4.4138 10.3081 4.45182 10.2822 4.48362 10.2495L8.37012 6.26177C8.43838 6.19174 8.47658 6.09782 8.47658 6.00002C8.47658 5.90223 8.43838 5.8083 8.37012 5.73827L4.48362 1.75053C4.45182 1.71787 4.4138 1.69192 4.37181 1.67419C4.32982 1.65647 4.2847 1.64734 4.23912 1.64734C4.19354 1.64734 4.14842 1.65647 4.10643 1.67419C4.06443 1.69192 4.02641 1.71787 3.99462 1.75053V1.74978Z"
              fill="var(--textColor)"
            />
          </svg>
        </div>
      )}
    />
  );
}
