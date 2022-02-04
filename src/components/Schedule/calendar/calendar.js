import Dailydetails from '../dailydetails';
import classNames from 'classnames';
import { Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import getCalendarData from './calendarData';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

const StudyCard = (event) => {
  const studies = event.arr;
  return (
    <>
      {studies.map((study, index) => (
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
            {study.studyName}
          </Card.Title>
          <Card.Subtitle>
            {study.startTime}~{study.endTime}
          </Card.Subtitle>
        </Card>
      ))}
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
  const days = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
  ];
  const [today, setToday] = useState(new Date(), []);
  const [weekly, setWeekly] = useState(getCalendarData);
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
            {monthNames[today.getMonth()]}{' '}
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="xs"
              style={{
                opacity: 0.5,
              }}
            />{' '}
            <FontAwesomeIcon
              icon={faChevronRight}
              size="xs"
              style={{
                opacity: 0.5,
              }}
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
                selected={false}
              >
                <p style={{ marginTop: '1rem' }}>{day}</p>
                <div
                  className={classNames('day-line')}
                  style={{
                    border: 'solid 2px #6C757D',
                  }}
                />
                <div
                  style={{
                    backgroundColor: '#F2F1F6',
                    borderRadius: '5px',
                    paddingBottom: '0.5rem',
                    marginBottom: '2rem',
                  }}
                >
                  <p
                    style={{
                      margin: '2rem 0rem',
                      fontFamily: 'pretandard',
                      fontSize: '26px',
                      paddingLeft: '0.5rem',
                    }}
                  >
                    {parseInt(
                      weekly[day].date.split('-').slice(2)
                    )}
                  </p>
                  <StudyCard arr={weekly[day].studies} />
                </div>
              </Col>
            ))}
          </Row>
        </Row>
        <Dailydetails />
      </Container>
    </>
  );
}
