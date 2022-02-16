import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../statics/css/todayStudy.css';

export default function Todaystudy({ weekly }) {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const [dailyStudies, setDailyStudies] = useState([]);
  useEffect(() => {
    try {
      setDailyStudies(weekly.filter((daily) => daily.date === JSON.parse(selectedDay))[0].studySchedules);
    } catch {
      setDailyStudies([]);
    }
  }, [selectedDay, weekly]);
  return (
    <Container className="schedule-today-study">
      <div className="schedule-today-study-header">스터디 일정</div>
      <Row>
        {dailyStudies.length !== 0 ? (
          dailyStudies.map((study, index) => (
            <Col key={index} className="schedule-today-study-box" sm={6} md={6} lg={6}>
              <div className="schedule-today-study-contents">
                <div className="schedule-today-study-contents-header">
                  <span className="schedule-today-study-contents__category">{study.categoryName}</span>
                  <span className="schedule-today-study-contents__title">{study.title}</span>
                </div>
                <div className="schedule-today-study-contents__desc">{study.shortDescription}</div>
                <div className="schedule-today-study-contents-foot">
                  <div className="schedule-today-study-contents__members">
                    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.5 7.5C8.44483 7.5 9.35097 7.12467 10.0191 6.45657C10.6872 5.78847 11.0625 4.88233 11.0625 3.9375C11.0625 2.99267 10.6872 2.08653 10.0191 1.41843C9.35097 0.750334 8.44483 0.375 7.5 0.375C6.55517 0.375 5.64903 0.750334 4.98093 1.41843C4.31283 2.08653 3.9375 2.99267 3.9375 3.9375C3.9375 4.88233 4.31283 5.78847 4.98093 6.45657C5.64903 7.12467 6.55517 7.5 7.5 7.5V7.5ZM9.875 3.9375C9.875 4.56739 9.62478 5.17148 9.17938 5.61688C8.73398 6.06228 8.12989 6.3125 7.5 6.3125C6.87011 6.3125 6.26602 6.06228 5.82062 5.61688C5.37522 5.17148 5.125 4.56739 5.125 3.9375C5.125 3.30761 5.37522 2.70352 5.82062 2.25812C6.26602 1.81272 6.87011 1.5625 7.5 1.5625C8.12989 1.5625 8.73398 1.81272 9.17938 2.25812C9.62478 2.70352 9.875 3.30761 9.875 3.9375V3.9375ZM14.625 13.4375C14.625 14.625 13.4375 14.625 13.4375 14.625H1.5625C1.5625 14.625 0.375 14.625 0.375 13.4375C0.375 12.25 1.5625 8.6875 7.5 8.6875C13.4375 8.6875 14.625 12.25 14.625 13.4375ZM13.4375 13.4328C13.4363 13.1406 13.2546 12.2619 12.4495 11.4567C11.6753 10.6825 10.2182 9.875 7.5 9.875C4.78063 9.875 3.32475 10.6825 2.5505 11.4567C1.74538 12.2619 1.56488 13.1406 1.5625 13.4328H13.4375Z"
                        fill="var(--textColor)"
                      />
                    </svg>
                    {study.isAttend}/6
                  </div>
                  <div className="schedule-today-study-contents__time">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18ZM9.78 5H9.72C9.32 5 9 5.32 9 5.72V10.44C9 10.79 9.18 11.12 9.49 11.3L13.64 13.79C13.98 13.99 14.42 13.89 14.62 13.55C14.6702 13.469 14.7036 13.3788 14.7182 13.2846C14.7328 13.1905 14.7283 13.0943 14.705 13.002C14.6817 12.9096 14.64 12.8229 14.5824 12.7469C14.5249 12.671 14.4526 12.6074 14.37 12.56L10.5 10.26V5.72C10.5 5.32 10.18 5 9.78 5V5Z"
                        fill="var(--textColor)"
                      />
                    </svg>
                    {study.startTime.slice(0, 5)}~{study.endTime.slice(0, 5)}
                  </div>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col className="schedule-today-study-box" sm={6} md={6} lg={6}>
            <div className="schedule-today-study-contents">
              <div className="no-contents">스터디 일정이 존재하지 않습니다</div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
}
