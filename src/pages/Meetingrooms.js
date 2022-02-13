import { Container, Col, Row, Card } from 'react-bootstrap';
import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import ApplicationModal from '../components/applicationModal';
import CategorySelect from '../components/categorySelect';
import Paginator from '../components/paginator';
import '../statics/css/studyRecruit.css';
import isLogin from '../utils/isLogin';

const MeetingroomCard = ({ meeting, openModal, setMeetingSeq }) => {
  const meetingroomImg =

    'https://i6a301.p.ssafy.io:8080/images/' + meeting.meetingImg;
  const defaultImg = 'images/meetingroom.png';
  const sendMeetingSeq = () => {
    setMeetingSeq(meeting.meetingSeq);
  };
  return (
    <Col
      lg={3}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      onClick={() => {
        openModal();
        sendMeetingSeq();
      }}
    >
      <Card style={{ marginBottom: '0.5rem' }}>

        <Card.Img
          style={{ maxHeight: "10rem" }}
          src={meeting.meetingImg ? meetingroomImg : defaultImg}
        />
      </Card>
      <div
        style={{

          fontFamily: 'pretendard',

        }}
      >
        {meeting.meetingTitle}
      </div>
    </Col>
  );
};

export default function Meetingrooms() {
  const TOKEN = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [category, setCategory] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [postData, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [meetingSeq, setMeetingSeq] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState('');

  useEffect(() => {
    getMeetingDetails();
  }, [meetingSeq]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeSearch = (event) => {
    setSearchInput(event.target.value);
  };
  const onClickSearch = () => {
    if (isLogin) {
      axios
        .get("/studies?page=1&type=" + category + "&key=" + searchInput, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          const data = res.data.data;
          setPostData((prevState) => ({
            ...prevState,
            data,
          }));
        });
    }
  };
  const onKeyEnter = (event) => {
    if (event.key === "Enter") {
      onClickSearch();
    }
  };
  useEffect(() => {
    if (isLogin) {
      if (!category) {
        setCategory(0);
      }
      axios
        .get(
          "/meetings?page=" +
            currentPage +
            "&type=" +
            category +
            "&key=" +
            searchInput,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        )
        .then((res) => {
          let data = res.data.data;
          setPostData((prevState) => ({
            ...prevState,
            data,
          }));
        });
    }
  }, [currentPage, category, searchInput]);
  async function getMeetingDetails() {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + `/meetings/${meetingSeq}`,
      {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('accessToken'),
        },
      }
    );
    let data = response.data;
    setSelectedMeeting(() => data);
  }
  function enterMeeting() {
    axios
      .post(process.env.REACT_APP_SERVER_URL + `/meetings/${meetingSeq}/room`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('accessToken'),
        },
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <main style={{ padding: "1rem 0" }}>
      <div className="studyrecruit">
        <div className="studyrecruit-heading">
          <span className="studyrecruit-h1">자유열람실</span>
          <span className="studyrecruit-h2">
            나와 맞는 자유열람실을 찾아보세요
          </span>
        </div>
        <div className="studyrecuit-middle">
          <div className="studyrecruit-search">
            <CategorySelect categoryseq={setCategory} />
            <div className="studyrecruit-search__bar">
              <input
                onKeyPress={onKeyEnter}
                onChange={onChangeSearch}
                placeholder="방제목, 글 내용으로 검색하세요"
              />
              <svg
                className="studyrecruit-search__icon"
                onClick={onClickSearch}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.625 16.6249L13.0736 13.0672L16.625 16.6249ZM15.0417 8.31242C15.0417 10.0971 14.3327 11.8087 13.0707 13.0707C11.8088 14.3326 10.0972 15.0416 8.3125 15.0416C6.52781 15.0416 4.81622 14.3326 3.55426 13.0707C2.29229 11.8087 1.58333 10.0971 1.58333 8.31242C1.58333 6.52773 2.29229 4.81614 3.55426 3.55418C4.81622 2.29222 6.52781 1.58325 8.3125 1.58325C10.0972 1.58325 11.8088 2.29222 13.0707 3.55418C14.3327 4.81614 15.0417 6.52773 15.0417 8.31242V8.31242Z"
                  stroke="var(--textColor-darker)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <button
            className="studyrecruit-create"
            onClick={() => navigate("/settings/meeting")}
          >
            내 열람실 바로가기
          </button>
        </div>
        <Container style={{ marginTop: "0.5rem", padding: "0rem" }}>
          <Row className="studyrecruit-board">
            {postData.data &&
              postData.data.map((meeting) => (
                <MeetingroomCard
                  setMeetingSeq={setMeetingSeq}
                  openModal={openModal}
                  key={meeting.meetingSeq}
                  meeting={meeting}
                />
              ))}
          </Row>
        </Container>
      </div>

      <div className="studyrecruit-pagination">
        <Paginator currentpage={setCurrentPage} />
      </div>

      <ApplicationModal open={modalOpen} close={closeModal}>
        <div style={{ textAlign: 'left', padding: '0 20%' }}>
          카테고리: {selectedMeeting.categoryName}
        </div>
        <div style={{ textAlign: 'left', padding: '0 20%' }}>
          호스트 이름: {selectedMeeting.hostName}
        </div>
        <div style={{ textAlign: 'left', padding: '0 20%' }}>
          카메라 규칙: {selectedMeeting.meetingCamType}
        </div>
        <div style={{ textAlign: 'left', padding: '0 20%' }}>
          현재 인원: {selectedMeeting.meetingHeadcount} / 12
        </div>
        <div style={{ textAlign: 'left', padding: '0 20%' }}>
          미팅룸 이름: {selectedMeeting.meetingTitle}
        </div>
        <div style={{ textAlign: 'left', padding: '0 20%' }}>
          미팅룸 설명: {selectedMeeting.meetingDesc}
        </div>
        <button
          style={{
            border: 'none',
            margin: '2rem',
            backgroundColor: '#6667ab',
            color: '#eeeeee',
          }}
          onClick={enterMeeting}
        >
          입실하기
        </button>
      </ApplicationModal>
    </main>
  );
}
