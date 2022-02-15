import axios from "axios";
import { previousDay } from "date-fns";
import { useEffect, useState } from "react";
import "../../../statics/css/home/homeStudiesList.css";

export default function HomeStudies() {
  const TOKEN = localStorage.getItem("accessToken");
  const [today, setToday] = useState(new Date());
  const [studies, setStudies] = useState("");
  useEffect(() => {
    axios
      .get("/users/studies", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          const data = res.data.studyList;
          setStudies(() => data);
        }
      });
  }, []);
  const date = today.getDay() + 1;
  console.log(studies);
  // console.log(studies.days[date]);
  // console.log(date);
  const [studyList, setStudyList] = useState("");
  const [data, setData] = useState("");

  // useEffect(() => {
  //   console.log(studies);
  //   if (studies) {
  //     studies.map((study) => {
  //       console.log(study.days);
  //     });
  //     // studies.days.map((day) => {
  //     //   console.log(day);
  //     // });
  //     // setData(() => studies.days.filter((day) => day === date));
  //     console.log(data);
  //     setStudyList((prev) => [...prev, data]);
  //   }
  // }, [studies]);
  // studies.map((study) => study.days.dayNumber);
  // console.log(studyList);
  // const studyList = studies.filter(
  //   (study) => study.hostName === "winter"
  //   // (study) => study.days.dayNumber === today.getDay() + 1
  // );

  // console.log(today);
  // console.log(studies);
  const numbersToDays = (num) => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    return days[num - 1];
  };

  return (
    <div className="home-todays-studyrooms-row">
      {studies &&
        studies.map((study) => (
          <div className="home-study-box" key={study.studySeq}>
            <div className="home-study-box__top">
              <div className="home-study-box__top-category">
                {study.categoryName}
              </div>
              <div className="home-study-box__top-title">{study.title}</div>
            </div>
            <div className="home-study-box__desc">{study.shortDescription}</div>
            <div className="home-study-box__date-time">
              {study.days.map((day) => (
                <div className="home-study-box__date-time" key={day.daySeq}>
                  <div className="home-study-box__date">
                    {numbersToDays(day.dayNumber)}
                  </div>
                  <div className="home-study-box__time">
                    {day.startTime.slice(0, 5)} - {day.endTime.slice(0, 5)}
                  </div>
                </div>
              ))}
            </div>
            <div className="home-study-box__footer">
              <div className="home-study-box__img-wrapper">
                {study.hostImage ? (
                  <img
                    src={`https://i6a301.p.ssafy.io:8080/images/${study.hostImage}`}
                  />
                ) : (
                  <svg
                    width="20"
                    height="20"
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
                )}
              </div>
              <div className="home-study-box__host">{study.hostName}</div>
            </div>
            <div className="home-study-box__members">
              {study.memberList.length}
            </div>
          </div>
        ))}
    </div>
  );
}
