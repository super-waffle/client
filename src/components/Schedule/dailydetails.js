import { Container, Row, Col } from 'react-bootstrap';
import TodoList from './todos';
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
        <h3 style={{ fontWeight: 'bold' }}>선택한 날짜</h3>
      </Row>
      <Row
        style={{
          padding: '0rem',
          margin: '0rem',
        }}
      >
        <Col sm={3} md={3} lg={3}>
          <TodoList />
        </Col>
        <Col>
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
