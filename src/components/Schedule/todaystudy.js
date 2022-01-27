import getStudies from './testdata';
import Card from 'react-bootstrap/Card';
import { Row, Container } from 'react-bootstrap';

export default function Todaystudy() {
  const studies = getStudies();
  return (
    <Container>
      <h3>오늘의 스터디 일정</h3>
      <Row>
        {studies.map((study, index) => (
          <Card lg={3} key={index}>
            <Card.Title>
              {study.study_title} {study.time_start}~
              {study.tiem_end}
            </Card.Title>
            <Card.Subtitle>
              {study.study_desc} <br />
              현원{study.study_capacity} #{study.category}
            </Card.Subtitle>
          </Card>
        ))}
      </Row>
    </Container>
  );
}
