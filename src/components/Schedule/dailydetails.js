import { Container, Row, Col } from 'react-bootstrap';
import DailyTodoList from './Todo/todos';
import Todaystudy from './todaystudy';
import Diary from './diary';

export default function Dailydetails() {
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
          선택한 날짜
        </h3>
      </Row>
      <Row
        style={{
          padding: '0rem',
          margin: '0rem',
        }}
      >
        <Col sm={4} md={4} lg={4}>
          <DailyTodoList />
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
