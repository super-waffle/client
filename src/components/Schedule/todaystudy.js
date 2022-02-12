import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const indexList = [1, 2, 3, 4, 5, 6, 7];
export default function Todaystudy({ weekly }) {
  console.log(weekly);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const studies = weekly
    ? indexList.filter((day) => weekly.day.date === selectedDay)
    : null;
  console.log(studies);

  return (
    <Container>
      <h5 style={{ fontFamily: 'pretandard', fontWeight: 'bold' }}>
        오늘의 스터디 일정
      </h5>
      <Row>
        {studies &&
          studies.map((study, index) => (
            <Col key={index} style={{ margin: '0.5rem' }}>
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
                  {study.study_title} {study.time_start}~{study.tiem_end}
                </Card.Title>
                <Card.Subtitle style={{ margin: '0rem 0.5rem' }}>
                  <p>{study.study_desc}</p>
                  <p>
                    현원{study.study_capacity} #{study.category}
                  </p>
                </Card.Subtitle>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
