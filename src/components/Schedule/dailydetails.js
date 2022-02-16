import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Todaystudy from './todaystudy';
// import Diary from './diary';
import DiaryRefac from './diary-refac';
import { useSelector } from 'react-redux';
import TodoList from './Todo/TodoList';
import '../../statics/css/dailyDetails.css';

export default function Dailydetails({ weekly }) {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  // console.log(parseInt(selectedDay.split("-")[2].slice(0, 2)));
  return (
    <Container fluid className="daily-details">
      <Row>
        <div className="daily-details__selected-day-header">
          {JSON.parse(selectedDay).split('-')[0]}년 {parseInt(JSON.parse(selectedDay).split('-')[1])}월{' '}
          {parseInt(JSON.parse(selectedDay).split('-')[2])}일{' '}
        </div>
      </Row>
      <Row>
        <Col sm={3} md={3} lg={3}>
          <TodoList />
        </Col>
        <Col sm={9} md={9} lg={9}>
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
            {/* <Diary day={selectedDay} /> */}
            <DiaryRefac />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
