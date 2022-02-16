import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Graph } from "../home/todays/homeStyle";
import "../../statics/css/home/homeGoal.css";

export default function LevelComponent(props) {
  const levelImgUrl = 'https://i6a301.p.ssafy.io:8080/images/' + props.levelImg;
  // let hour = ("0" + Math.floor((props.timeTotal / 60) % 60)).slice(-2);
  // let minute = ("0" + Math.floor((props.timeTotal) % 60)).slice(-2);
  const TOKEN = localStorage.getItem('accessToken');
  const [dayTotalStudyTime, setDayTotalStudyTime] = useState(0);
  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month  + '-' + day;

  var levelPercent = 
  (((props.timeTotal-props.levelCondition)/props.conditionToNext)*100).toFixed(2);

  var hour=(data)=>{
    return ("0" + Math.floor((data / 60) % 60)).slice(-2);
  }
  var minute=(data)=>{
    return ("0" + Math.floor((data) % 60)).slice(-2);
  }

  useEffect(() => {
      axios
        .get(
          process.env.REACT_APP_SERVER_URL +
            `/stats?date=${dateString}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        )
        .then((res) => {
          if (res.data.statusCode == 200) {
            let data = res.data.result.dayTotalStudyTime;
            setDayTotalStudyTime(() => data);
          }else if(res.data.statusCode == 404)
          {
            setDayTotalStudyTime(() => 0);
          }
         
        });
  },[]);
  return (
    <div className="">
      <div style={{ width: '50%' }}>
        {props.levelImg && (
          <img src={levelImgUrl} alt="" style={{ width: '40%' }} />
        )}
        <div>
          Lv.{props.level} {props.levelName}
        </div>
      </div>
      <span>오늘 공부시간 </span>
      <span>{hour(dayTotalStudyTime)}시간 {minute(dayTotalStudyTime)}분</span>

      <span>총 공부시간</span>
      <span>{hour(props.timeTotal)}시간 {minute(props.timeTotal)}분</span>
      <span>레벨달성률</span>
      <span>{levelPercent}%</span>
        <div className="my-goal__graph">
          <div className="my-goal__graph-back"></div>
          <Graph goal={props.conditionToNext} total={(props.timeTotal-props.levelCondition)}></Graph>
        </div>
    </div>
  );
}
