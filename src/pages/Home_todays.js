import "../statics/css/homeTodays.css";

export default function HomeTodays() {
  return (
    <div className="home-todays">
      <div className="home-todays-top">
        <div className="home-todays-todos">
          <span>오늘의 할일</span>
          <div className="home-todays-todos-box"></div>
        </div>
        <div className="home-todays-goal">
          <span>오늘의 공부</span>
          <div className="home-todays-goal-box"></div>
        </div>
      </div>
      <div className="home-todays-studyrooms">
        <span>스터디 일정</span>
        <div className="home-todays-studyrooms-row">
          <div className="home-todays-studyrooms-box"></div>
          <div className="home-todays-studyrooms-box"></div>
        </div>
        <div className="home-todays-studyrooms-row">
          <div className="home-todays-studyrooms-box"></div>
          <div className="home-todays-studyrooms-box"></div>
        </div>
      </div>
      <div className="home-todays-meetingrooms">
        <span>자유열람실</span>
        <div className="home-todays-meetingrooms-row">
          <div className="home-todays-meetingrooms-box"></div>
          <div className="home-todays-meetingrooms-box"></div>
          <div className="home-todays-meetingrooms-box"></div>
        </div>
        <div className="home-todays-meetingrooms-row">
          <div className="home-todays-meetingrooms-box"></div>
          <div className="home-todays-meetingrooms-box"></div>
          <div className="home-todays-meetingrooms-box"></div>
        </div>
      </div>
    </div>
  );
}
