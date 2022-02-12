import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const indexList = [1, 2, 3, 4, 5, 6, 7];
export default function Todaystudy({ weekly }) {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  // const studies = weekly
  //   ? indexList.filter((day) => weekly.day.date === selectedDay)
  //   : null;
  // console.log(studies);
  const studies = [];

  return (
    <Container>
      <h5 style={{ fontFamily: 'pretandard', fontWeight: 'bold' }}>
        {selectedDay.slice(9, 11)}일의 스터디 일정
      </h5>
      <Row>
        {studies ? (
          <Col style={{ margin: '0.5rem' }}>
            <Card>
              <Card.Title
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  fontFamily: 'pretandard',
                }}
              >
                스터디 일정이 존재하지 않습니다.
              </Card.Title>
            </Card>
          </Col>
        ) : (
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
          ))
        )}
      </Row>
    </Container>
  );
}
