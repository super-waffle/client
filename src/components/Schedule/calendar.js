import Dailydetails from './dailydetails';
import { Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { toPrevWeek, toNextWeek, selectDay } from './scheduleSlice';
import axios from 'axios';
import { useEffect } from 'react';
import isLogin from '../../utils/isLogin';

import '../../statics/css/calendar.css';

const StudyCard = ({ studies }) => {
  return (
    <>
      <p className="calendar-box-date">{studies && studies.date.split('-')[2]}</p>
      {studies ? (
        studies.studySchedules.map((study, index) => (
          <Card className="calendar-box-studies" key={index}>
            <Card.Title>{study.title}</Card.Title>
            <Card.Subtitle>
              {study.isAttend === 0 ? (
                <img
                  // src="icons/calendar/_study_attend.svg"
                  src="icons/calendar/_circle-fill.svg"
                  alt=""
                  style={{ color: '#6667ab' }}
                />
              ) : null}
              {study.isAttend === 1 ? (
                <img
                  // src="icons/calendar/_study_late.svg"
                  src="icons/calendar/_circle-half.svg"
                  alt=""
                  style={{ color: '#6667ab' }}
                />
              ) : null}
              {study.isAttend === 2 ? (
                <img
                  // src="icons/calendar/_study_absent.svg"
                  src="icons/calendar/_circle.svg"
                  alt=""
                  style={{ color: '#6667ab' }}
                />
              ) : null}
              {study.isAttend === 3 ? (
                <img src="icons/calendar/_study_absent.svg" alt="" style={{ color: '#6667ab' }} />
              ) : null}
              {study.startTime.slice(0, 5)} - {study.endTime.slice(0, 5)}
            </Card.Subtitle>
          </Card>
        ))
      ) : (
        <Card>
          <Card.Title style={{ fontWeight: 'bold', fontFamily: 'pretendard' }}>스터디 일정이 없어요</Card.Title>
        </Card>
      )}
    </>
  );
};

export default function Calendar() {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dispatch = useDispatch();
  const startDay = useSelector((state) => state.schedule.startDay);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const [weekly, setWeekly] = useState([]);

  async function getSchedule() {
    if (isLogin()) {
      try {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/schedules?date=${JSON.parse(startDay)}`, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('accessToken'),
          },
        });
        setWeekly(response.data.list);
      } catch (err) {
        console.log('Error:', err);
      }
    } else {
      console.log('Need Login');
    }
  }

  useEffect(() => getSchedule(), [startDay]);
  // console.log(days, weekly);
  // useCallback(() => getTodos(), [selectedDay, todoAdd]);
  return (
    <>
      <Container fluid>
        <Row>
          <p>
            <span className="month-nav">{monthNames[parseInt(startDay.split('-')[1]) - 1]} </span>
            <FontAwesomeIcon
              className="pointer-icon"
              icon={faChevronLeft}
              size="lg"
              onClick={() => dispatch(toPrevWeek())}
            />{' '}
            <FontAwesomeIcon
              className="pointer-icon"
              icon={faChevronRight}
              size="lg"
              onClick={() => dispatch(toNextWeek())}
            />
          </p>
        </Row>
        <div className="calendar-box">
          <Row className="calendar-box-day day">
            {days.map((day, index) => (
              <Col
                key={index}
                className="calendar-box-day"
                onClick={() => {
                  dispatch(selectDay(JSON.stringify(weekly ? weekly[index]['date'] : null)));
                }}
              >
                <div className="calendar-box-dayname">{day}</div>
                {weekly[index] && (
                  <div
                    className={`calendar-box-daycontents ${
                      JSON.parse(selectedDay) === weekly[index]['date'] ? 'day-selected' : ''
                    }`}
                  >
                    {weekly && <StudyCard studies={weekly[index]} />}
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </div>
        {weekly && <Dailydetails weekly={weekly} />}
      </Container>
    </>
  );
}
