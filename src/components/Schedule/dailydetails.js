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
          margin: '0rem',
        }}
      >
        <Col>
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
