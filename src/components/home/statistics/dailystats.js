import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../statics/css/home/dailyStats.css";
import CircularProgressBar from "../achievement/CircularProgressBar";

export default function DailyStats(props) {
  const [date, setDate] = useState("");
  const [nodata, setNodata] = useState("");
  const [dayTotal, setDayTotal] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [total, setTotal] = useState("");
  const [todos, setTodos] = useState("");
  const [todoCompleted, setTodoCompleted] = useState("");

  const startTimeArray = startTime.split(":");
  const endTimeArray = endTime.split(":");
  const useTotal =
    Number(endTimeArray[0]) * 60 +
    Number(endTimeArray[1]) -
    (Number(startTimeArray[0]) * 60 + Number(startTimeArray[1]));

  useEffect(() => {
    if (props.selectedDay) {
      axios
        .get(
          process.env.REACT_APP_SERVER_URL + "/stats?date=" + props.selectedDay,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          setDate(() => props.selectedDay.split("-"));
          if (res.data.statusCode === 200) {
            const RESULT = res.data.result;
            setDayTotal(RESULT.dayTotalStudyTime);
            setMeetingTime(RESULT.meetingRoomTime);
            setStudyTime(RESULT.studyRoomTime);
            setStartTime(RESULT.studyStartTime);
            setEndTime(RESULT.studyEndTime);
            setTotal(RESULT.userTotalStudyTime);
            setNodata(false);
          } else if (res.data.statusCode === 404) {
            setNodata(true);
          }
        });
      axios
        .get(
          process.env.REACT_APP_SERVER_URL + `/todos?date=${props.selectedDay}`,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          // console.log(res);
          if (res.data.statusCode === 200) {
            setTodos(() => res.data.todoList);
          }
        });
    } else {
      axios
        .get(
          process.env.REACT_APP_SERVER_URL +
            "/stats?date=" +
            JSON.parse(props.defaultDay),
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          setDate(() => JSON.parse(props.defaultDay).split("-"));
          if (res.data.statusCode === 200) {
            const RESULT = res.data.result;
            setDayTotal(RESULT.dayTotalStudyTime);
            setMeetingTime(RESULT.meetingRoomTime);
            setStudyTime(RESULT.studyRoomTime);
            setStartTime(RESULT.studyStartTime);
            setEndTime(RESULT.studyEndTime);
            setTotal(RESULT.userTotalStudyTime);
            setNodata(false);
          } else if (res.data.statusCode === 404) {
            setNodata(true);
          }
        });
      axios
        .get(
          process.env.REACT_APP_SERVER_URL +
            `/todos?date=${JSON.parse(props.defaultDay)}`,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          if (res.data.statusCode === 200) {
            setTodos(() => res.data.todoList);
          }
        });
    }
  }, [props.selectedDay]);

  useEffect(() => {
    if (todos) {
      setTodoCompleted(() =>
        todos.filter((todo) => todo.todoCompleted === true)
      );
    }
  }, [todos]);

  return (
    <div className="daily-stats">
      <div className="daily-stats-header">
        {date[0]}년 {date[1]}월 {date[2]}일
      </div>
      <div className="daily-stats-all">
        {!nodata && (
          <div className="daily-stats-body">
            <div>
              <div className="daily-stats-body__header">하루 공부 시간</div>
              <div className="daily-stats-body__contents">
                {parseInt(dayTotal / 60)}시간{" "}
                {dayTotal - parseInt(dayTotal / 60) * 60}분
              </div>
            </div>
            <div>
              <div className="daily-stats-body__header">시작시간</div>
              <div className="daily-stats-body__contents">{startTime}</div>
            </div>
            <div>
              <div className="daily-stats-body__header">스터디룸 이용시간</div>
              <div className="daily-stats-body__contents">
                {parseInt(studyTime / 60)}시간{" "}
                {studyTime - parseInt(studyTime / 60) * 60}분
              </div>
            </div>
            <div>
              <div className="daily-stats-body__header">누적 공부 시간</div>
              <div className="daily-stats-body__contents">
                {parseInt(total / 60)}시간 {total - parseInt(total / 60) * 60}분
              </div>
            </div>
            <div>
              <div className="daily-stats-body__header">종료시간</div>
              <div className="daily-stats-body__contents">{endTime}</div>
            </div>
            <div>
              <div className="daily-stats-body__header">미팅룸 이용시간</div>
              <div className="daily-stats-body__contents">
                {parseInt(meetingTime / 60)}시간{" "}
                {meetingTime - parseInt(meetingTime / 60) * 60}분
              </div>
            </div>
          </div>
        )}
        {!nodata && (
          <div className="daily-stats-graph">
            <div className="daily-stats-graph__circular">
              <div className="daily-stats-graph__circular-header">
                공부휴식 비율
              </div>
              <div className="daily-stats-graph__circular-graph">
                {useTotal && (
                  <CircularProgressBar
                    percentage={((dayTotal / useTotal) * 100).toFixed(1)}
                  />
                )}
              </div>
            </div>
            <div className="daily-stats-graph__circular">
              <div className="daily-stats-graph__circular-header">
                오늘의 할 일 달성률
              </div>
              <div className="daily-stats-graph__circular-graph">
                {todos ? (
                  <CircularProgressBar
                    percentage={(
                      (todoCompleted.length / todos.length) *
                      100
                    ).toFixed(1)}
                  />
                ) : (
                  <CircularProgressBar percentage={0} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {nodata && (
        <div className="no-data">해당 날짜에 공부한 기록이 없습니다</div>
      )}
    </div>
  );
}
