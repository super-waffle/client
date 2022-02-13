import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Todaystudy from './todaystudy';
import Diary from './diary';
import { useSelector } from 'react-redux';
import TodoList from './Todo/TodoList';

export default function Dailydetails({ weekly }) {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  return (
    <Container
      fluid
      style={{
        margin: '2rem 0rem',
        padding: '0rem',
      }}
    >
      <Row
        style={{
          padding: '0rem',
          margin: '1rem 0rem',
        }}
      >
        <h3
          style={{
            fontWeight: 'bold',
            textAlign: 'left',
            fontFamily: 'pretandard',
          }}
        >
          {JSON.parse(selectedDay).split('-')[0]}년{' '}
          {parseInt(JSON.parse(selectedDay).split('-')[1])}월{' '}
          {parseInt(JSON.parse(selectedDay).split('-')[2])}일{' '}
        </h3>
      </Row>
      <Row
        style={{
          padding: '0rem',
          margin: '0rem',
        }}
      >
        <Col sm={4} md={4} lg={4}>
          <TodoList />
        </Col>
        <Col sm={8} md={8} lg={8}>
          <Row>
            {weekly ? (
              <Todaystudy weekly={weekly} />
            ) : (
              <Col style={{ margin: '0.5rem' }}>
                <h5 style={{ fontFamily: 'pretandard', fontWeight: 'bold' }}>
                  {selectedDay.slice(9, 11)}일의 스터디 일정
                </h5>
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
            )}
          </Row>
          <Row>
            <Diary />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
