import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Graph } from "../todays/homeStyle";
import "../../../statics/css/home/homeGoal.css";
import "../../../statics/css/home/levelComponent.css";

export default function LevelComponent(props) {
  const levelImgUrl = "https://i6a301.p.ssafy.io:8080/images/" + props.levelImg;
  const TOKEN = localStorage.getItem("accessToken");
  const [dayTotalStudyTime, setDayTotalStudyTime] = useState(0);
  var today = new Date();
  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  var dateString = year + "-" + month + "-" + day;

  var levelPercent = (
    (props.timeTotal / (props.conditionToNext - props.levelCondition)) *
    100
  ).toFixed(2);

  var hour = (data) => {
    return ("0" + Math.floor((data / 60) % 60)).slice(-2);
  };
  var minute = (data) => {
    return ("0" + Math.floor(data % 60)).slice(-2);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/stats?date=${dateString}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode == 200) {
          let data = res.data.result.dayTotalStudyTime;
          setDayTotalStudyTime(() => data);
        } else if (res.data.statusCode == 404) {
          setDayTotalStudyTime(() => 0);
        }
      });
  }, []);

  return (
    <div className="level-component">
      <div className="level-component__my-level">
        {props.levelImg && <img src={levelImgUrl} alt="" />}
        <div className="level-component__my-level-text">
          Lv.{props.level} {props.levelName}
        </div>
      </div>
      <div className="level-component__info">
        <div className="level-component__stats">
          <div className="level-component__stats__content">
            <div className="level-component__stats__content-header">
              오늘 공부시간
            </div>
            <div className="level-component__stats__content-body">
              {parseInt(dayTotalStudyTime / 60)}시간{" "}
              {dayTotalStudyTime - parseInt(dayTotalStudyTime / 60) * 60}분
            </div>
          </div>
          <div className="level-component__stats__content">
            <div className="level-component__stats__content-header">
              총 공부시간
            </div>
            <div className="level-component__stats__content-body">
              {parseInt(props.timeTotal / 60)}시간{" "}
              {props.timeTotal - parseInt(props.timeTotal / 60) * 60}분
            </div>
          </div>
          <div className="level-component__stats__content">
            <div className="level-component__stats__content-header">
              레벨달성률
            </div>
            <div className="level-component__stats__content-body">
              {levelPercent}%
            </div>
          </div>
        </div>
        <div className="my-goal__graph">
          <div className="my-goal__graph-back"></div>
          <Graph
            goal={props.conditionToNext - props.levelCondition}
            total={props.timeTotal}
          ></Graph>
        </div>
      </div>
    </div>
  );
}
