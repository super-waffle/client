import { Card, Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ApplicationModal from '../components/applicationModal';
import CategorySelect from '../components/categorySelect';

const MeetingroomCard = ({ meeting, openModal, setMeetingSeq }) => {
  const meetingroomImg = 'https://i6a301.p.ssafy.io:8080/images/' + meeting.meetingImg;
  const defaultImg = '../../images/meetingroom.png';
  const [bookmark, setBookmark] = useState(true);
  const sendMeetingSeq = () => {
    setMeetingSeq(meeting.meetingSeq);
  };
  const changeBookmark = () => {
    // 현재 즐겨찾기 중 => 누르면 해제
    if (bookmark) {
      axios
        .delete(process.env.REACT_APP_SERVER_URL + `/bookmarks/${meeting.meetingSeq}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then((res) => {
          setBookmark(false);
        });
    } else {
      axios
        .post(
          process.env.REACT_APP_SERVER_URL + `/bookmarks/${meeting.meetingSeq}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        )
        .then((res) => {
          setBookmark(true);
        });
    }
  };
  return (
    <Col
      lg={4}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      onClick={() => {
        openModal();
        sendMeetingSeq();
        localStorage.setItem('meetingSeq', meeting.meetingSeq);
      }}
    >
      <Card style={{ marginBottom: '0.5rem' }}>
        <div>
          <Card.Img
            style={{ position: 'relative', height: '200px' }}
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
          <div>
            {bookmark ? (
              <img
                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                src="/icons/meetingroom/_bookmark_true.svg"
                onClick={(e) => {
                  e.stopPropagation();
                  changeBookmark();
                }}
                alt=""
              />
            ) : (
              <img
                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                src="/icons/meetingroom/_bookmark_false.svg"
                onClick={(e) => {
                  e.stopPropagation();
                  changeBookmark();
                }}
                alt=""
              />
            )}
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

export default function SettingsMeetingFavorite() {
  const TOKEN = localStorage.getItem('accessToken');
  const [category, setCategory] = useState(0);
  const [categorized, setCategorized] = useState([]);
  const [meetings, setMeetings] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const [meetingSeq, setMeetingSeq] = useState('');
  const [hostname, setHostname] = useState('');
  const getMeeting = async () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/bookmarks`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        setMeetings(() => response.data.bookmarkList);
        setCategorized(() => response.data.bookmarkList);
      });
  };
  const renewCategory = () => {
    if (meetings) {
      if (category === '카테고리 선택') {
        setCategorized(() => meetings);
      } else {
        setCategorized((current) => meetings.filter((meeting) => meeting.categorySeq === parseInt(category)));
      }
    }
  };
  const getMeetingDetails = () => {
    setSelectedMeeting(() => meetings.filter((meeting) => meeting.meetingSeq === parseInt(meetingSeq))[0]);
  };
  const getHostname = async () => {
    if (selectedMeeting) {
      var hostSeq = selectedMeeting.hostSeq;
      await axios
        .get(process.env.REACT_APP_SERVER_URL + `/users/${hostSeq}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((response) => {
          console.log(response.data.otherUserProfileInfo.userNickname);
          setHostname(() => response.data.otherUserProfileInfo.userNickname);
        });
    }
  };
  useEffect(() => {
    getMeeting();
  }, []);
  useEffect(() => {
    renewCategory();
  }, [category]);
  useEffect(() => {
    if (meetingSeq) {
      getMeetingDetails();
    }
  }, [meetingSeq]);
  useEffect(() => {
    getHostname();
  }, [selectedMeeting]);

  const openModal = () => {
    setModalStatus(true);
  };
  const closeModal = () => {
    setModalStatus(false);
  };
  return (
    <>
      <div className="settings-study">
        <div className="settings-study-heading">
          <div className="settings-study-heading__h1">자유열람실 즐겨찾기</div>
          <div className="settings-study-heading__h2">즐겨찾기한 자유열람실 목록을 확인할 수 있습니다</div>
        </div>

        <CategorySelect categoryseq={setCategory} />

        <Container style={{ marginTop: '1rem' }}>
          <Row>
            {categorized &&
              categorized.map((meeting, index) => (
                <MeetingroomCard meeting={meeting} openModal={openModal} setMeetingSeq={setMeetingSeq} key={index} />
              ))}
          </Row>
        </Container>
        {selectedMeeting && (
          <ApplicationModal open={modalStatus} close={closeModal}>
            {console.log(selectedMeeting)}
            <div style={{ textAlign: 'left', padding: '0 20%' }}>카테고리: {selectedMeeting.category.categoryName}</div>
            <div style={{ textAlign: 'left', padding: '0 20%' }}>호스트 이름: {selectedMeeting.hostNickname}</div>
            <div style={{ textAlign: 'left', padding: '0 20%' }}>
              현재 인원: {selectedMeeting.meetingHeadcount} / 12
            </div>
            <div style={{ textAlign: 'left', padding: '0 20%' }}>미팅룸 이름: {selectedMeeting.meetingTitle}</div>
            <div style={{ textAlign: 'left', padding: '0 20%' }}>미팅룸 설명: {selectedMeeting.meetingDesc}</div>

            <Link
              to={{
                pathname: `/meeting/${meetingSeq}`,
              }}
            >
              <button
                style={{
                  border: 'none',
                  margin: '2rem',
                  backgroundColor: '#6667ab',
                  color: '#eeeeee',
                }}
                onClick={() => {
                  localStorage.setItem('meetingSeq', meetingSeq);
                }}
              >
                입실하기
              </button>
            </Link>
          </ApplicationModal>
        )}
      </div>
    </>
  );
}
