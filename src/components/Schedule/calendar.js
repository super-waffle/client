import Dailydetails from './dailydetails';
import classNames from 'classnames';
import { Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { toPrevWeek, toNextWeek, selectDay } from './scheduleSlice';
import axios from 'axios';
import { useEffect } from 'react';
import isLogin from '../../utils/isLogin';

const StudyCard = ({ arr }) => {
  const studies = arr;
  return (
    <>
      <p
        style={{
          margin: '2rem 0rem',
          fontFamily: 'pretandard',
          fontSize: '26px',
          paddingLeft: '0.5rem',
        }}
      >
        {studies && studies.date.split('-')[2]}
      </p>
      {studies ? (
        studies.studySchedules.map((study, index) => (
          <Card
            key={index}
            style={{
              margin: '1rem 0rem',
              border: '0px',
              backgroundColor: 'transparent',
              padding: '0.5rem',
            }}
          >
            <Card.Title style={{ fontWeight: 'bold' }}>
              {study.title}
            </Card.Title>
            <Card.Subtitle>
              {study.startTime}~{study.endTime}
            </Card.Subtitle>
          </Card>
        ))
      ) : (
        <Card>
          <Card.Title style={{ fontWeight: 'bold' }}>
            스터디 일정이 없어요
          </Card.Title>
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
  const [weekly, setWeekly] = useState([]);
  const getSchedule = () => {
    if (isLogin()) {
      try {
        axios
          .get(
            process.env.REACT_APP_SERVER_URL +
              `/schedules?date=${JSON.parse(startDay)}`,
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('accessToken'),
              },
            }
          )
          .then((res) => {
            setWeekly(res.data.list);
          });
      } catch (err) {
        console.log('Error:', err);
      }
    } else {
      console.log('Need Login');
    }
  };
  useEffect(() => getSchedule(), [startDay]);

  // useCallback(() => getTodos(), [selectedDay, todoAdd]);
  return (
    <>
      <Container
        fluid
        style={{
          padding: '2rem 4rem',
        }}
      >
        <Row>
          <p className={classNames('month-nav')}>
            {monthNames[parseInt(startDay.split('-')[1]) - 1]}{' '}
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="xs"
              style={{
                opacity: 0.5,
              }}
              onClick={() => dispatch(toPrevWeek())}
            />{' '}
            <FontAwesomeIcon
              icon={faChevronRight}
              size="xs"
              style={{
                opacity: 0.5,
              }}
              onClick={() => dispatch(toNextWeek())}
            />
          </p>
        </Row>
        <Row
          style={{
            background: '#fcfcfc',
            border: '1px solid #ededed',
            boxSizing: 'border-box',
            borderRadius: '5px',
          }}
        >
          <Row className={classNames('day')}>
            {days.map((day, index) => (
              <Col
                key={index}
                style={{ margin: '0.3rem' }}
                onClick={() => {
                  dispatch(
                    selectDay(
                      JSON.stringify(weekly ? weekly[index]['date'] : null)
                    )
                  );
                }}
              >
                <p style={{ marginTop: '1rem' }}>{day}</p>
                <div
                  className={classNames('day-line')}
                  style={{
                    background: '#6c75cd',
                    border: 'solid 2px #6C757D',
                  }}
                />
                <div
                  style={{
                    // backgroundColor: '#F2F1F6',
                    borderRadius: '5px',
                    paddingBottom: '0.5rem',
                    marginBottom: '2rem',
                  }}
                >
                  {weekly && <StudyCard arr={weekly[index]} />}
                </div>
              </Col>
            ))}
          </Row>
        </Row>
        {weekly && <Dailydetails weerkly={weekly} />}
      </Container>
    </>
  );
}
