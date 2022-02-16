import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import isLogin from '../utils/isLogin';
import '../statics/css/home/homeAchievement.css';
import LevelComponent from '../components/home-achievement/levelComponent';
import AchievementList from '../components/home-achievement/achievementList';
import Myachievement from '../components/home-achievement/myachievement'; 
export default function HomeAchievement() {
  const TOKEN = localStorage.getItem("accessToken");

  const [nickname, setNickname] = useState("");
  const [level, setLevel] = useState("");
  const [levelName, setLevelName] = useState("");
  const [levelImg, setLevelImg] = useState("");
  const [timeGoal, setTimeGoal] = useState("");
  const [timeTotal, setTimeTotal] = useState("");
  const [levelCondition, setLevelCondition] = useState("");
  const [conditionToNext, setConditionToNext] = useState("");

  if (isLogin()) {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/users", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const USER = res.data.user;
        setNickname(USER.userNickname);
        setLevel(USER.userLevel.levelSeq);
        setLevelName(USER.userLevel.levelName);
        setLevelImg(USER.userImageLevel.levelImg);
        setLevelCondition(USER.userLevel.levelCondition);
        setConditionToNext(USER.userLevel.conditionToNext);
        setTimeGoal(USER.userTimeGoal);
        setTimeTotal(USER.userTimeTotal);
      });
  }
  return (
    <div className="home-achievement">
      <div className="home-achievement-top">
        <span>나의 레벨 및 업적</span>
        <div className="home-achievement-top-box">
          <div className="home-achievement-level">
            <LevelComponent 
              level={level}
              levelImg={levelImg}
              levelName={levelName}
              timeGoal={timeGoal}
              timeTotal={timeTotal}
              levelCondition={levelCondition}
              conditionToNext={conditionToNext}
            />
          </div>
          <div className="home-achievement-achieve">
            <Myachievement/>
          </div>
        </div>
      </div>
      <div className="home-achievement-bottom">
        <span>{nickname}님의 업적도감</span>
        <div className="home-achievement-dogam">
          <AchievementList/>
        </div>
      </div>
    </div>
  );
}
