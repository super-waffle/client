import getStudies from './testdata';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';

export default function Todaystudy() {
  const studies = getStudies();
  return (
    <Container>
      <h4>오늘의 스터디 일정</h4>
      <Row>
        {studies.map((study, index) => (
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
                {study.study_title} {study.time_start}~
                {study.tiem_end}
              </Card.Title>
              <Card.Subtitle
                style={{ margin: '0rem 0.5rem' }}
              >
                <p>{study.study_desc}</p>
                <p>
                  현원{study.study_capacity} #
                  {study.category}
                </p>
              </Card.Subtitle>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
