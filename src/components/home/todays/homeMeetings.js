import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../statics/css/home/homeMeetings.css';

const MeetingroomCard = ({ meeting }) => {
  const [imgSelected, setImgSelected] = useState('');
  const [hostName, setHostName] = useState('');
  const images = [
    'meetingroom01.jpg',
    'meetingroom02.jpg',
    'meetingroom03.jpg',
    'meetingroom04.jpg',
    'meetingroom05.jpg',
    'meetingroom06.jpg',
    'meetingroom07.jpg',
  ];
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + `/users/${meeting.hostSeq}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHostName(res.data.otherUserProfileInfo.userNickname);
        }
      });
  }, [meeting]);

  useEffect(() => {
    setImgSelected(images[Math.floor(Math.random() * images.length)]);
  }, [meeting]);

  const meetingroomImg = 'https://i6a301.p.ssafy.io:8080/images/' + meeting.meetingImg;
  const defaultImg = `../../../../images/${imgSelected}`;
  const [bookmark, setBookmark] = useState(meeting.inBookmark);

  const navigate = useNavigate();
  return (
    <div
      className="home-meetings-card"
      onClick={() => {
        localStorage.setItem('meetingSeq', meeting.meetingSeq);
        navigate(`/meeting/${meeting.meetingSeq}`);
      }}
    >
      <div className="home-meetings-card__img">
        <img src={meeting.meetingImg ? meetingroomImg : defaultImg} alt="" />
      </div>
      <div className="home-meetimg-card__title">{meeting.meetingTitle}</div>
      <div className="home-meeting-card__footer">
        <div className="home-meetimg-card__hostname">{hostName}</div>
        <div className="home-meeting-card__img__count">
          <svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 7.5C8.44483 7.5 9.35097 7.12467 10.0191 6.45657C10.6872 5.78847 11.0625 4.88233 11.0625 3.9375C11.0625 2.99267 10.6872 2.08653 10.0191 1.41843C9.35097 0.750334 8.44483 0.375 7.5 0.375C6.55517 0.375 5.64903 0.750334 4.98093 1.41843C4.31283 2.08653 3.9375 2.99267 3.9375 3.9375C3.9375 4.88233 4.31283 5.78847 4.98093 6.45657C5.64903 7.12467 6.55517 7.5 7.5 7.5V7.5ZM9.875 3.9375C9.875 4.56739 9.62478 5.17148 9.17938 5.61688C8.73398 6.06228 8.12989 6.3125 7.5 6.3125C6.87011 6.3125 6.26602 6.06228 5.82062 5.61688C5.37522 5.17148 5.125 4.56739 5.125 3.9375C5.125 3.30761 5.37522 2.70352 5.82062 2.25812C6.26602 1.81272 6.87011 1.5625 7.5 1.5625C8.12989 1.5625 8.73398 1.81272 9.17938 2.25812C9.62478 2.70352 9.875 3.30761 9.875 3.9375V3.9375ZM14.625 13.4375C14.625 14.625 13.4375 14.625 13.4375 14.625H1.5625C1.5625 14.625 0.375 14.625 0.375 13.4375C0.375 12.25 1.5625 8.6875 7.5 8.6875C13.4375 8.6875 14.625 12.25 14.625 13.4375ZM13.4375 13.4328C13.4363 13.1406 13.2546 12.2619 12.4495 11.4567C11.6753 10.6825 10.2182 9.875 7.5 9.875C4.78063 9.875 3.32475 10.6825 2.5505 11.4567C1.74538 12.2619 1.56488 13.1406 1.5625 13.4328H13.4375Z"
              fill="#3e3e3e"
            />
          </svg>
          {meeting.meetingHeadcount}
        </div>
      </div>
    </div>
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
    <div className="home-meetings">
      {meetings && meetings.map((meeting, index) => <MeetingroomCard meeting={meeting} key={index} />)}
    </div>
  );
}
