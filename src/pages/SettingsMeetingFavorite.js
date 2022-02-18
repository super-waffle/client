// import { Card, Col, Container, Row } from 'react-bootstrap';
// import { useState } from 'react';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';

// import ApplicationModal from '../components/applicationModal';
// import CategorySelect from '../components/categorySelect';

// const MeetingroomCard = ({ meeting, openModal, setMeetingSeq }) => {
//   const meetingroomImg = 'https://i6a301.p.ssafy.io:8080/images/' + meeting.meetingImg;
//   const defaultImg = '../../images/meetingroom.png';
//   const [bookmark, setBookmark] = useState(true);
//   const sendMeetingSeq = () => {
//     setMeetingSeq(meeting.meetingSeq);
//   };
//   const changeBookmark = () => {
//     // 현재 즐겨찾기 중 => 누르면 해제
//     if (bookmark) {
//       axios
//         .delete(process.env.REACT_APP_SERVER_URL + `/bookmarks/${meeting.meetingSeq}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//         })
//         .then((res) => {
//           setBookmark(false);
//         });
//     } else {
//       axios
//         .post(
//           process.env.REACT_APP_SERVER_URL + `/bookmarks/${meeting.meetingSeq}`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//             },
//           }
//         )
//         .then((res) => {
//           setBookmark(true);
//         });
//     }
//   };
//   return (
//     <Col
//       lg={4}
//       style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
//       onClick={() => {
//         openModal();
//         sendMeetingSeq();
//         localStorage.setItem('meetingSeq', meeting.meetingSeq);
//       }}
//     >
//       <Card style={{ marginBottom: '0.5rem' }}>
//         <div>
//           <Card.Img
//             style={{ position: 'relative', height: '200px' }}
//             src={meeting.meetingImg ? meetingroomImg : defaultImg}
//           />

//           <div
//             style={{
//               padding: '0rem 0.5rem',
//               position: 'absolute',
//               bottom: '0.5rem',
//               left: '0.5rem',
//               backgroundColor: 'white',
//               opacity: 0.7,
//               borderRadius: '5px',
//             }}
//           >
//             <div>{meeting.meetingHeadcount} / 12</div>
//           </div>
//           <div>
//             {bookmark ? (
//               <img
//                 style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
//                 src="/icons/meetingroom/_bookmark_true.svg"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   changeBookmark();
//                 }}
//                 alt=""
//               />
//             ) : (
//               <img
//                 style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
//                 src="/icons/meetingroom/_bookmark_false.svg"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   changeBookmark();
//                 }}
//                 alt=""
//               />
//             )}
//           </div>
//         </div>
//       </Card>
//       <Card.Subtitle
//         style={{
//           fontFamily: 'pretendard',
//         }}
//       >
//         {meeting.meetingTitle}
//       </Card.Subtitle>
//     </Col>
//   );
// };

// export default function SettingsMeetingFavorite() {
//   const TOKEN = localStorage.getItem('accessToken');
//   const [category, setCategory] = useState(0);
//   const [categorized, setCategorized] = useState([]);
//   const [meetings, setMeetings] = useState('');
//   const [modalStatus, setModalStatus] = useState(false);
//   const [selectedMeeting, setSelectedMeeting] = useState('');
//   const [meetingSeq, setMeetingSeq] = useState('');
//   const [hostname, setHostname] = useState('');
//   const getMeeting = async () => {
//     axios
//       .get(process.env.REACT_APP_SERVER_URL + `/bookmarks`, {
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//         },
//       })
//       .then((response) => {
//         setMeetings(() => response.data.bookmarkList);
//         setCategorized(() => response.data.bookmarkList);
//       });
//   };
//   const renewCategory = () => {
//     if (meetings) {
//       if (category === '카테고리 선택') {
//         setCategorized(() => meetings);
//       } else {
//         setCategorized((current) => meetings.filter((meeting) => meeting.categorySeq === parseInt(category)));
//       }
//     }
//   };
//   const getMeetingDetails = () => {
//     setSelectedMeeting(() => meetings.filter((meeting) => meeting.meetingSeq === parseInt(meetingSeq))[0]);
//   };
//   const getHostname = async () => {
//     if (selectedMeeting) {
//       var hostSeq = selectedMeeting.hostSeq;
//       await axios
//         .get(process.env.REACT_APP_SERVER_URL + `/users/${hostSeq}`, {
//           headers: {
//             Authorization: `Bearer ${TOKEN}`,
//           },
//         })
//         .then((response) => {
//           console.log(response.data.otherUserProfileInfo.userNickname);
//           setHostname(() => response.data.otherUserProfileInfo.userNickname);
//         });
//     }
//   };
//   useEffect(() => {
//     getMeeting();
//   }, []);
//   useEffect(() => {
//     renewCategory();
//   }, [category]);
//   useEffect(() => {
//     if (meetingSeq) {
//       getMeetingDetails();
//     }
//   }, [meetingSeq]);
//   useEffect(() => {
//     getHostname();
//   }, [selectedMeeting]);

//   const openModal = () => {
//     setModalStatus(true);
//   };
//   const closeModal = () => {
//     setModalStatus(false);
//   };
//   return (
//     <>
//       <div className="settings-study">
//         <div className="settings-study-heading">
//           <div className="settings-study-heading__h1">자유열람실 즐겨찾기</div>
//           <div className="settings-study-heading__h2">즐겨찾기한 자유열람실 목록을 확인할 수 있습니다</div>
//         </div>

//         <CategorySelect categoryseq={setCategory} />

//         <Container style={{ marginTop: '1rem' }}>
//           <Row>
//             {categorized &&
//               categorized.map((meeting, index) => (
//                 <MeetingroomCard meeting={meeting} openModal={openModal} setMeetingSeq={setMeetingSeq} key={index} />
//               ))}
//           </Row>
//         </Container>
//         {selectedMeeting && (
//           <ApplicationModal open={modalStatus} close={closeModal}>
//             {console.log(selectedMeeting)}
//             <div style={{ textAlign: 'left', padding: '0 20%' }}>카테고리: {selectedMeeting.category.categoryName}</div>
//             <div style={{ textAlign: 'left', padding: '0 20%' }}>호스트 이름: {selectedMeeting.hostNickname}</div>
//             <div style={{ textAlign: 'left', padding: '0 20%' }}>
//               현재 인원: {selectedMeeting.meetingHeadcount} / 12
//             </div>
//             <div style={{ textAlign: 'left', padding: '0 20%' }}>미팅룸 이름: {selectedMeeting.meetingTitle}</div>
//             <div style={{ textAlign: 'left', padding: '0 20%' }}>미팅룸 설명: {selectedMeeting.meetingDesc}</div>

//             <Link
//               to={{
//                 pathname: `/meeting/${meetingSeq}`,
//               }}
//             >
//               <button
//                 style={{
//                   border: 'none',
//                   margin: '2rem',
//                   backgroundColor: '#6667ab',
//                   color: '#eeeeee',
//                 }}
//                 onClick={() => {
//                   localStorage.setItem('meetingSeq', meetingSeq);
//                 }}
//               >
//                 입실하기
//               </button>
//             </Link>
//           </ApplicationModal>
//         )}
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import CategorySelect from "../components/categorySelect";
import Paginator from "../components/paginator";
import "../statics/css/studyRecruit.css";
import isLogin from "../utils/isLogin";
import ModalLarge from "../components/modalLarge";

const MeetingroomCard = ({ meeting, openModal, setMeetingSeq }) => {
  console.log(meeting);
  const [imgSelected, setImgSelected] = useState("");
  const images = [
    "meetingroom01.jpg",
    "meetingroom02.jpg",
    "meetingroom03.jpg",
    "meetingroom04.jpg",
    "meetingroom05.jpg",
    "meetingroom06.jpg",
    "meetingroom07.jpg",
    "meetingroom08.jpg",
    "meetingroom09.jpg",
    "meetingroom10.jpg",
    "meetingroom11.jpg",
  ];
  useEffect(() => {
    setImgSelected(images[Math.floor(Math.random() * images.length)]);
  }, [meeting]);

  const meetingroomImg =
    "https://i6a301.p.ssafy.io:8080/images/" + meeting.meetingImg;
  const defaultImg = `../../images/${imgSelected}`;

  const [bookmark, setBookmark] = useState(true);
  const sendMeetingSeq = () => {
    setMeetingSeq(meeting.meetingSeq);
  };

  const changeBookmark = () => {
    // 현재 즐겨찾기 중 => 누르면 해제
    if (bookmark) {
      axios
        .delete(
          process.env.REACT_APP_SERVER_URL + `/bookmarks/${meeting.meetingSeq}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
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
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          setBookmark(true);
        });
    }
  };
  console.log(meeting);
  return (
    <div
      className="meetingroom-card"
      onClick={() => {
        openModal();
        sendMeetingSeq();
        localStorage.setItem("meetingSeq", meeting.meetingSeq);
      }}
    >
      <div className="meetingroom-card__img">
        <img src={meeting.meetingImg ? meetingroomImg : defaultImg} alt="" />
        <div>
          {bookmark ? (
            <svg
              onClick={(e) => {
                e.stopPropagation();
                changeBookmark();
              }}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                cursor: "pointer",
              }}
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0074 5.56251L11.0484 4.8418L8.83161 0.347663C8.77106 0.224617 8.67145 0.125007 8.54841 0.0644604C8.23981 -0.0878834 7.86481 0.0390697 7.71052 0.347663L5.49372 4.8418L0.534735 5.56251C0.398016 5.58204 0.273016 5.64649 0.177313 5.74415C0.0616135 5.86307 -0.0021424 6.02305 5.49725e-05 6.18896C0.00225234 6.35486 0.0702231 6.5131 0.189032 6.62891L3.77692 10.127L2.92927 15.0664C2.90939 15.1813 2.9221 15.2995 2.96597 15.4075C3.00984 15.5156 3.0831 15.6092 3.17745 15.6777C3.2718 15.7462 3.38346 15.7869 3.49977 15.7952C3.61609 15.8035 3.7324 15.7791 3.83552 15.7246L8.27106 13.3926L12.7066 15.7246C12.8277 15.7891 12.9683 15.8106 13.1031 15.7871C13.4429 15.7285 13.6715 15.4063 13.6129 15.0664L12.7652 10.127L16.3531 6.62891C16.4508 6.53321 16.5152 6.40821 16.5347 6.27149C16.5875 5.92969 16.3492 5.61329 16.0074 5.56251V5.56251Z"
                fill="#FFD15A"
              />
            </svg>
          ) : (
            <svg
              onClick={(e) => {
                e.stopPropagation();
                changeBookmark();
              }}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                cursor: "pointer",
              }}
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8495 5.55172L11.1385 4.86705L9.03249 0.597614C8.97497 0.48072 8.88034 0.386091 8.76345 0.328571C8.47028 0.183845 8.11403 0.30445 7.96745 0.597614L5.86149 4.86705L1.15045 5.55172C1.02057 5.57027 0.901822 5.6315 0.810904 5.72428C0.700989 5.83725 0.640421 5.98924 0.642508 6.14684C0.644596 6.30445 0.709168 6.45478 0.822037 6.5648L4.23054 9.88795L3.42526 14.5804C3.40638 14.6896 3.41846 14.8019 3.46013 14.9045C3.5018 15.0071 3.5714 15.096 3.66103 15.1611C3.75067 15.2262 3.85675 15.2649 3.96724 15.2728C4.07774 15.2807 4.18824 15.2574 4.2862 15.2057L8.49997 12.9903L12.7137 15.2057C12.8288 15.267 12.9624 15.2874 13.0904 15.2651C13.4133 15.2094 13.6303 14.9033 13.5747 14.5804L12.7694 9.88795L16.1779 6.5648C16.2707 6.47389 16.3319 6.35513 16.3505 6.22525C16.4006 5.90055 16.1742 5.59996 15.8495 5.55172ZM11.3351 9.42037L12.005 13.3224L8.49997 11.4818L4.99499 13.3243L5.66481 9.42223L2.82966 6.65758L6.74841 6.08795L8.49997 2.53843L10.2515 6.08795L14.1703 6.65758L11.3351 9.42037Z"
                fill="#FFD15A"
              />
            </svg>
          )}
        </div>
        <div className="meetingroom-card__img__headcount">
          {meeting.meetingHeadcount} / 12
        </div>
      </div>
      <div className="meetingroom-card__title">{meeting.meetingTitle}</div>
    </div>
  );
};

export default function SettingsMeetingFavorite() {
  const TOKEN = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [category, setCategory] = useState(0);
  const [meetings, setMeetings] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [postData, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [meetingSeq, setMeetingSeq] = useState("");
  const [selectedMeeting, setSelectedMeeting] = useState("");
  const [imgSelected, setImgSelected] = useState("");
  const [categorized, setCategorized] = useState([]);

  const images = [
    "meetingroom01.jpg",
    "meetingroom02.jpg",
    "meetingroom03.jpg",
    "meetingroom04.jpg",
    "meetingroom05.jpg",
    "meetingroom06.jpg",
    "meetingroom07.jpg",
    "meetingroom08.jpg",
    "meetingroom09.jpg",
    "meetingroom10.jpg",
    "meetingroom11.jpg",
  ];
  useEffect(() => {
    setImgSelected(images[Math.floor(Math.random() * images.length)]);
  }, [meetingSeq]);

  const meetingroomImg =
    "https://i6a301.p.ssafy.io:8080/images/" + selectedMeeting.meetingImg;
  const defaultImg = `../../images/${imgSelected}`;

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
      if (category === "카테고리 선택") {
        setCategorized(() => meetings);
      } else {
        setCategorized((current) =>
          meetings.filter(
            (meeting) => meeting.categorySeq === parseInt(category)
          )
        );
      }
    }
  };
  const onClickSearch = () => {
    if (isLogin) {
      axios
        .get(
          process.env.REACT_APP_SERVER_URL +
            `/meetings?page=1&type=${category}&key=${searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        )
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
          process.env.REACT_APP_SERVER_URL +
            `/meetings?page=${currentPage}&type=${category}&key=${searchInput}`,
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
          Authorization: `Bearer ` + localStorage.getItem("accessToken"),
        },
      }
    );
    let data = response.data;
    setSelectedMeeting(() => data);
  }
  useEffect(() => {
    localStorage.setItem("studySeq", meetingSeq);
  }, [meetingSeq]);
  useEffect(() => {
    getMeeting();
  }, []);
  useEffect(() => {
    renewCategory();
  }, [category]);
  console.log(categorized);
  return (
    <div
      className="studyrecruit"
      style={{ paddingLeft: "0", paddingRight: "0" }}
    >
      <div className="studyrecruit-heading">
        <span className="studyrecruit-h1">즐겨찾기한 자유열람실 관리</span>
        <span className="studyrecruit-h2">
          내가 즐겨찾기 해둔 자유열람실을 모아봤어요. 언제든지 수정할 수
          있습니다.
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
        {/* <button
          className="studyrecruit-create"
          onClick={() => navigate("/settings/meeting")}
        >
          내 열람실 바로가기
        </button> */}
      </div>
      <div className="meetingroom-list">
        {categorized &&
          categorized.map((meeting) => (
            <MeetingroomCard
              setMeetingSeq={setMeetingSeq}
              openModal={openModal}
              key={meeting.meetingSeq}
              meeting={meeting}
            />
          ))}
      </div>

      <div className="studyrecruit-pagination">
        <Paginator currentpage={setCurrentPage} />
      </div>
      <ModalLarge open={modalOpen} close={closeModal}>
        <div className="meeting-detail-modal">
          <div className="meeting-detail-modal__img">
            <img
              src={selectedMeeting.meetingImg ? meetingroomImg : defaultImg}
              alt=""
            />
          </div>
          <div className="meeting-detail-modal__contents">
            <div className="meeting-detail-modal__contents-header">
              <span className="meeting-detail-modal__category">
                {selectedMeeting.categoryName}
              </span>
              <span className="meeting-detail-modal__title">
                {selectedMeeting.meetingTitle}
              </span>
            </div>
            <div className="meeting-detail-modal__contents-body">
              <div className="meeting-detail-modal__hostname">
                <svg
                  className="meetingroom__crown"
                  width="16"
                  height="16"
                  viewBox="0 0 640 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M528 448H112C103.2 448 96 455.2 96 464V496C96 504.8 103.2 512 112 512H528C536.8 512 544 504.8 544 496V464C544 455.2 536.8 448 528 448ZM592 128C565.5 128 544 149.5 544 176C544 183.1 545.6 189.7 548.4 195.8L476 239.2C460.6 248.4 440.7 243.2 431.8 227.6L350.3 85C361 76.2 368 63 368 48C368 21.5 346.5 0 320 0C293.5 0 272 21.5 272 48C272 63 279 76.2 289.7 85L208.2 227.6C199.3 243.2 179.3 248.4 164 239.2L91.7 195.8C94.4 189.8 96.1 183.1 96.1 176C96.1 149.5 74.6 128 48.1 128C21.6 128 0 149.5 0 176C0 202.5 21.5 224 48 224C50.6 224 53.2 223.6 55.7 223.2L128 416H512L584.3 223.2C586.8 223.6 589.4 224 592 224C618.5 224 640 202.5 640 176C640 149.5 618.5 128 592 128Z"
                    fill="#F2C831"
                  />
                </svg>
                {selectedMeeting.hostName}
              </div>
              <div className="meeting-detail-modal__hostname">
                <svg
                  className="meetingroom__person"
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 7.5C8.44483 7.5 9.35097 7.12467 10.0191 6.45657C10.6872 5.78847 11.0625 4.88233 11.0625 3.9375C11.0625 2.99267 10.6872 2.08653 10.0191 1.41843C9.35097 0.750334 8.44483 0.375 7.5 0.375C6.55517 0.375 5.64903 0.750334 4.98093 1.41843C4.31283 2.08653 3.9375 2.99267 3.9375 3.9375C3.9375 4.88233 4.31283 5.78847 4.98093 6.45657C5.64903 7.12467 6.55517 7.5 7.5 7.5V7.5ZM9.875 3.9375C9.875 4.56739 9.62478 5.17148 9.17938 5.61688C8.73398 6.06228 8.12989 6.3125 7.5 6.3125C6.87011 6.3125 6.26602 6.06228 5.82062 5.61688C5.37522 5.17148 5.125 4.56739 5.125 3.9375C5.125 3.30761 5.37522 2.70352 5.82062 2.25812C6.26602 1.81272 6.87011 1.5625 7.5 1.5625C8.12989 1.5625 8.73398 1.81272 9.17938 2.25812C9.62478 2.70352 9.875 3.30761 9.875 3.9375V3.9375ZM14.625 13.4375C14.625 14.625 13.4375 14.625 13.4375 14.625H1.5625C1.5625 14.625 0.375 14.625 0.375 13.4375C0.375 12.25 1.5625 8.6875 7.5 8.6875C13.4375 8.6875 14.625 12.25 14.625 13.4375ZM13.4375 13.4328C13.4363 13.1406 13.2546 12.2619 12.4495 11.4567C11.6753 10.6825 10.2182 9.875 7.5 9.875C4.78063 9.875 3.32475 10.6825 2.5505 11.4567C1.74538 12.2619 1.56488 13.1406 1.5625 13.4328H13.4375Z"
                    fill="var(--textColor-todo)"
                  />
                </svg>
                {selectedMeeting.meetingHeadcount}
              </div>
            </div>
            <div className="meeting-detail-modal__desc">
              {selectedMeeting.meetingDesc}
            </div>
          </div>
        </div>
        <center>
          <Link
            to={{
              pathname: `/meeting/${meetingSeq}`,
            }}
          >
            <button className="meeting-modal-in-btn">입실하기</button>
          </Link>
        </center>
      </ModalLarge>
    </div>
  );
}
