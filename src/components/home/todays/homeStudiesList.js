import axios from "axios";
import { useEffect, useState } from "react";
import "../../../statics/css/home/homeStudiesList.css";

export default function HomeStudies() {
  const TOKEN = localStorage.getItem("accessToken");
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

  const numbersToDays = (num) => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    return days[num - 1];
  };

  return (
    <div className="home-todays-studyrooms-row">
      {studies &&
        studies.map((study) => (
          <div className="home-study-box">
            <div className="home-study-box__top">
              <div className="home-study-box__top-category">
                {study.categoryName}
              </div>
              <div className="home-study-box__top-title">{study.title}</div>
            </div>
            {study.days.map((day) => (
              <div className="home-study-box__date-time">
                <div className="home-study-box__date">
                  {numbersToDays(day.dayNumber)}
                </div>
                <div className="home-study-box__time">
                  {day.startTime.slice(0, 5)} - {day.endTime.slice(0, 5)}
                </div>
              </div>
            ))}
            <div className="home-study-box__desc">{study.shortDescription}</div>
            <div className="home-study-box__img">{study.hostImage}</div>
            <div className="home-study-box__host">{study.hostName}</div>
            <div className="home-study-box__members">
              {study.memberList.length}
            </div>
          </div>
        ))}
    </div>
  );
}
