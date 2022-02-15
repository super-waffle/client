import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../statics/css/home/homeGoal.css";
import { Graph } from "./homeStyle";

export default function MyGoal() {
  const today = useSelector((state) => state.schedule.today);
  const [timeGoal, setTimeGoal] = useState("");
  const [timeTotal, setTimeTotal] = useState("");

  useEffect(() => {
    axios
      .get("/users", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log()
          setTimeGoal(res.data.user.userTimeGoal);
          // setTimeTotal(res.data.user.userTimeTotal);
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
  }, []);
  console.log(timeGoal, timeTotal);

  return (
    <div className="my-goal">
      <div className="my-goal-top">
        <div className="my-goal__header">My Goal</div>
        <div className="my-goal__time">
          {parseInt(timeTotal / 60)}시간{" "}
          {timeTotal - parseInt(timeTotal / 60) * 60}분 / {timeGoal / 60}시간
        </div>
        <div className="my-goal__graph">
          <div className="my-goal__graph-back"></div>
          <Graph
            // className="my-goal__graph-front"
            goal={timeGoal}
            total={timeTotal}
          ></Graph>
        </div>
      </div>

      <div className="my-goal-bottom"></div>
    </div>
  );
}
