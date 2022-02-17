import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MeetingroomCard = ({ meeting }) => {
  const meetingroomImg = 'https://i6a301.p.ssafy.io:8080/images/' + meeting.meetingImg;
  const defaultImg = '../../../../images/meetingroom.png';
  const navigate = useNavigate();
  return (
    <Col lg={4} md={4} sm={4}>
      <Card
        style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
        onClick={() => {
          localStorage.setItem('meetingSeq', meeting.meetingSeq);
          navigate(`/meeting/${meeting.meetingSeq}`);
        }}
      >
        <div>
          <Card.Img
            style={{ position: 'relative', height: '150px' }}
            src={meeting.meetingImg ? meetingroomImg : defaultImg}
          />

          <div
            style={{
              padding: '0rem 0.5rem',
              position: 'absolute',
              bottom: '0.5rem',
              left: '0.5rem',
              backgroundColor: 'white',
              opacity: 0.7,
              borderRadius: '5px',
            }}
          >
            <div>{meeting.meetingHeadcount} / 12</div>
          </div>
        </div>
      </Card>
      <Card.Subtitle
        style={{
          fontFamily: 'pretendard',
        }}
      >
        {meeting.meetingTitle}
      </Card.Subtitle>
    </Col>
  );
};

export default function HomeMeetings() {
  const [meetings, setMeetings] = useState();
  const getBookmarks = async () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/bookmarks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setMeetings(response.data.bookmarkList);
      });
  };
  useEffect(() => {
    getBookmarks();
  }, []);
  return (
    <Container>
      <Row>{meetings && meetings.map((meeting, index) => <MeetingroomCard meeting={meeting} key={index} />)}</Row>
    </Container>
  );
}
