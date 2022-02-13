import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Todaystudy({ weekly }) {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const [dailyStudies, setDailyStudies] = useState([]);
  useEffect(() => {
    try {
      setDailyStudies(
        weekly.filter((daily) => daily.date === JSON.parse(selectedDay))[0]
          .studySchedules
      );
    } catch {
      setDailyStudies([]);
    }
  }, [selectedDay]);

  return (
    <Container style={{ fontFamily: 'pretendard' }}>
      <h5 style={{ fontFamily: 'pretendard', fontWeight: 'bold' }}>
        {parseInt(JSON.parse(selectedDay).split('-')[2])}일의 스터디 일정
      </h5>
      <Row>
        {dailyStudies.length !== 0 ? (
          dailyStudies.map((study) => (
            <Col
              key={study.studySeq}
              style={{ margin: '0.5rem', maxWidth: '20rem' }}
            >
              <Card
                style={{
                  margin: '0.5rem',
                  padding: '0.5rem',
                }}
              >
                <Card.Title
                  style={{
                    margin: '0.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {study.title}
                </Card.Title>

                <Card.Subtitle
                  style={{ margin: '0rem 0rem', padding: '0.5rem' }}
                >
                  <p>
                    {study.startTime.slice(0, 5)}~{study.endTime.slice(0, 5)}
                  </p>
                  <p>{study.study_desc}</p>
                  <p>
                    현원{study.isAttend} #{study.categoryName}
                  </p>
                </Card.Subtitle>
              </Card>
            </Col>
          ))
        ) : (
          <Col style={{ margin: '0.5rem' }}>
            <Card
              style={{
                margin: '0.5rem',
                padding: '0.5rem',
              }}
            >
              <Card.Title
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  fontFamily: 'pretendard',
                }}
              >
                스터디 일정이 존재하지 않습니다.
              </Card.Title>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}
