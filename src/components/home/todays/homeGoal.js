import axios from "axios";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../statics/css/home/homeGoal.css";
import { Graph } from "./homeStyle";

export default function MyGoal() {
  const today = useSelector((state) => state.schedule.today);
  const [timeGoal, setTimeGoal] = useState("");
  const [timeTotal, setTimeTotal] = useState("");
  const [yesterday, setYesterday] = useState("");
  const [total, setTotal] = useState("");
  const [date, setDate] = useState(addDays(new Date(), -1));

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
    axios
      .get("/users", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setTimeGoal(res.data.user.userTimeGoal);
          setTotal(res.data.user.userTimeTotal);
        }
      });
    axios
      .get("/stats?date=" + JSON.parse(today), {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.statusCode === 404) {
          setTimeTotal(0);
        } else if (res.data.statusCode === 200) {
          setTimeTotal(res.data.result.dayTotalStudyTime);
        }
      });
    axios
      .get("/stats?date=" + changeDateFormat(date), {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.statusCode == 200) {
          setYesterday(res.data.result.dayTotalStudyTime);
        } else if (res.data.statusCode === 404) {
          setYesterday(0);
        }
      });
  }, []);

  return (
    <div className="my-goal">
      <div className="my-goal-top">
        <div className="my-goal__header">My Goal</div>
        <div className="my-goal__time">
          <div className="my-goal__time-today">
            {parseInt(timeTotal / 60)}시간{" "}
            {timeTotal - parseInt(timeTotal / 60) * 60}분
          </div>
          / {timeGoal / 60}시간
        </div>
        <div className="my-goal__graph">
          <div className="my-goal__graph-back"></div>
          <Graph goal={timeGoal} total={timeTotal}></Graph>
        </div>
      </div>

      <div className="my-goal-bottom">
        <div className="my-goal-bottom__left">
          <div className="my-goal-bottom__header">어제보다 오늘더</div>
          <div className="my-goal-bottom__time">
            {parseInt((timeTotal - yesterday) / 60)}시간{" "}
            {timeTotal -
              yesterday -
              parseInt((timeTotal - yesterday) / 60) * 60}
            분
          </div>
        </div>
        <div className="my-goal-bottom__right">
          <div className="my-goal-bottom__header">누적 공부시간</div>
          <div className="my-goal-bottom__time">
            {parseInt(total / 60)}시간 {total - parseInt(total / 60) * 60}분
          </div>
        </div>
      </div>
    </div>
  );
}
