import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import isLogin from '../utils/isLogin';
import '../statics/css/homeAchievement.css';

export default function HomeAchievement() {
  const TOKEN = localStorage.getItem('accessToken');

  const [nickname, setNickname] = useState('');
  const [level, setLevel] = useState('');
  const [levelName, setLevelName] = useState('');
  const [levelImg, setLevelImg] = useState('');
  const [timeGoal, setTimeGoal] = useState('');
  const [timeTotal, setTimeTotal] = useState('');

  if (isLogin()) {
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/users', {
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
        setTimeGoal(USER.userTimeGoal);
        setTimeTotal(USER.userTimeTotal);
      });
  }
  return (
    <div className="home-achievement">
      <div className="home-achievement-top">
        <span>나의 레벨 및 업적</span>
        <div className="home-achievement-top-box">
          <div className="home-achievement-level"></div>
          <div className="home-achievement-achieve"></div>
        </div>
      </div>
      <div className="home-achievement-bottom">
        <span>{nickname}님의 업적도감</span>
        <div className="home-achievement-dogam"></div>
      </div>
    </div>
  );
}
