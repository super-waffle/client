import { Container, Row, Col } from 'react-bootstrap';
import TodoList from './todos';
import Todaystudy from './todaystudy';

export default function Dailydetails() {
  return (
    <Container
      fluid
      style={{
        margin: '2rem 0rem',
        padding: '0rem',
        border: '1px solid',
      }}
    >
      <Row
        style={{
          padding: '0rem',
          margin: '0rem',
        }}
      >
        <Col style={{ border: '1px solid' }}>
          <TodoList />
        </Col>
        <Col style={{ border: '1px solid' }}>
          <Row style={{ border: '1px solid' }}>
            <Todaystudy />
          </Row>
          <Row style={{ border: '1px solid' }}>diary</Row>
        </Col>
      </Row>
    </Container>
  );
}
