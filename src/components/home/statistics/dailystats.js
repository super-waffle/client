import axios from "axios";
import { useEffect, useState } from "react";
import "../../../statics/css/home/dailyStats.css";

export default function DailyStats(props) {
  const date = props.selectedDay.split("-");
  const [dailyData, setDailyData] = useState("");
  const [dayTotal, setDayTotal] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    axios
      .get("/stats?date=" + props.selectedDay, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.statusCode === 200) {
          // setDailyData(res.data.result);
          const RESULT = res.data.result;
          setDayTotal(RESULT.dayTotalStudyTime);
          setMeetingTime(RESULT.meetingRoomTime);
          setStudyTime(RESULT.studyRoomTime);
          setStartTime(RESULT.studyStartTime);
          setEndTime(RESULT.studyEndTime);
          setTotal(RESULT.userTotalStudyTime);
        }
      });
  });
  return (
    <div className="daily-stats">
      <div className="daily-stats-header">
        {date[0]}년 {date[1]}월 {date[2]}일
      </div>
      <div className="daily-stats-body">
        <div>
          <div className="daily-stats-body__header">하루 공부 시간</div>
          <div className="daily-stats-body__contents">{dayTotal}</div>
        </div>
        <div>
          <div className="daily-stats-body__header">시작시간</div>
          <div className="daily-stats-body__contents">{startTime}</div>
        </div>
        <div>
          <div className="daily-stats-body__header">스터디룸 이용시간</div>
          <div className="daily-stats-body__contents">{studyTime}</div>
        </div>
        <div>
          <div className="daily-stats-body__header">누적 공부 시간</div>
          <div className="daily-stats-body__contents">{total}</div>
        </div>
        <div>
          <div className="daily-stats-body__header">종료시간</div>
          <div className="daily-stats-body__contents">{endTime}</div>
        </div>
        <div>
          <div className="daily-stats-body__header">미팅룸 이용시간</div>
          <div className="daily-stats-body__contents">{meetingTime}</div>
        </div>
      </div>
    </div>
  );
}
