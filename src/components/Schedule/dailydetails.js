import { Container, Row, Col } from 'react-bootstrap';
import Todaystudy from './todaystudy';
import Diary from './diary';
import { useSelector } from 'react-redux';

export default function Dailydetails() {
  const selectDay = useSelector((state) => state.schedule.selectedDay);
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
            textAlign: 'center',
          }}
        >
          {JSON.parse(selectDay).split('-')[0]}년{' '}
          {parseInt(JSON.parse(selectDay).split('-')[1])}월{' '}
          {parseInt(JSON.parse(selectDay).split('-')[2])}일{' '}
        </h3>
      </Row>
      <Row
        style={{
          padding: '0rem',
          margin: '0rem',
        }}
      >
        <Col sm={4} md={4} lg={4}>
          {/* <DailyTodoList /> */}
        </Col>
        <Col sm={8} md={8} lg={8}>
          <Row>
            <Todaystudy />
          </Row>
          <Row>
            <Diary />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
