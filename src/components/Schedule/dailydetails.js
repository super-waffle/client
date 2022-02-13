import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Todaystudy from './todaystudy';
import Diary from './diary';
import { useSelector } from 'react-redux';
import TodoList from './Todo/TodoList';

export default function Dailydetails({ weekly }) {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  console.log(parseInt(selectedDay.split('-')[2].slice(0, 2)));
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
            fontFamily: 'pretendard',
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
              <Todaystudy weekly={weekly} style={{ margin: '0.5rem' }} />
            ) : (
              <Col>
                <Card style={{ margin: '0.5rem' }}>
                  <Card.Title
                    style={{
                      textAlign: 'center',
                      padding: '1.5rem',
                      fontFamily: 'pretendard',
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
