import { useEffect, useState } from 'react';

import HomeMeetings from '../components/home/todays/homeMeetings';
import HomeTodos from '../components/home/todays/homeTodos';
import '../statics/css/home/homeTodays.css';
import HomeStudies from '../components/home/todays/homeStudiesList';
import MyGoal from '../components/home/todays/homeGoal';

export default function HomeTodays() {
  const [isAddTodo, setIsAddTodo] = useState(false);

  // 할일 추가하기 버튼 누르면 자동으로 인풋 박스로 포커스 (스크롤 이동)
  useEffect(() => {
    if (isAddTodo) {
      let needFocus = document.getElementById('home-todays-todos-box');
      needFocus.scrollTop = needFocus.scrollHeight;
    }
  }, [isAddTodo]);

  return (
    <div className="home-todays">
      <div className="home-todays-top">
        <div className="home-todays-todos">
          <span>오늘의 할일</span>
          <button onClick={() => setIsAddTodo(!isAddTodo)}>+ 추가하기</button>
          <div className="home-todays-todos-box" id="home-todays-todos-box">
            <HomeTodos add={isAddTodo} />
          </div>
        </div>

        <div className="home-todays-goal">
          <span>오늘의 공부</span>
          <MyGoal />
        </div>
      </div>

      <div className="home-todays-studyrooms">
        <span>스터디 일정</span>
        <HomeStudies />
      </div>

      <div className="home-todays-meetingrooms">
        <span>자유열람실</span>
        <HomeMeetings />
      </div>
    </div>
  );
}
