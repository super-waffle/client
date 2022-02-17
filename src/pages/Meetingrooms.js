import { Container, Col, Row, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import ApplicationModal from "../components/applicationModal";
import CategorySelect from "../components/categorySelect";
import Paginator from "../components/paginator";
import "../statics/css/studyRecruit.css";
import isLogin from "../utils/isLogin";

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
  const defaultImg = `images/${imgSelected}`;

  const [bookmark, setBookmark] = useState(meeting.inBookmark);
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
    // <Col
    //   lg={3}
    //   style={{ marginBottom: "0.5rem", cursor: "pointer" }}
    //   onClick={() => {
    //     openModal();
    //     sendMeetingSeq();
    //     localStorage.setItem("meetingSeq", meeting.meetingSeq);
    //   }}
    // >
    //   <Card style={{ marginBottom: "0.5rem" }}>
    //     <div>
    //       <Card.Img
    //         style={{ position: "relative", height: "150px" }}
    //         src={meeting.meetingImg ? meetingroomImg : defaultImg}
    //       />

    //       <div
    //         style={{
    //           padding: "0rem 0.5rem",
    //           position: "absolute",
    //           bottom: "0.5rem",
    //           left: "0.5rem",
    //           backgroundColor: "white",
    //           opacity: 0.7,
    //           borderRadius: "5px",
    //         }}
    //       >
    //         <div>{meeting.meetingHeadcount} / 12</div>
    //       </div>
    // <div>
    //   {bookmark ? (
    //     <img
    //       style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
    //       src="icons/meetingroom/_bookmark_true.svg"
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         changeBookmark();
    //       }}
    //       alt=""
    //     />
    //   ) : (
    //     <img
    //       style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
    //       src="icons/meetingroom/_bookmark_false.svg"
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         changeBookmark();
    //       }}
    //       alt=""
    //     />
    //   )}
    // </div>
    //     </div>
    //   </Card>
    //   <Card.Subtitle
    //     style={{
    //       fontFamily: "pretendard",
    //     }}
    //   >
    //     {meeting.meetingTitle}
    //   </Card.Subtitle>
    // </Col>
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
  const [meetingSeq, setMeetingSeq] = useState("");
  const [selectedMeeting, setSelectedMeeting] = useState("");

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
        {/* <Container style={{ marginTop: "0.5rem", padding: "0rem" }}>
          <Row className="studyrecruit-board"> */}
        <div className="meetingroom-list">
          {postData.data &&
            postData.data.map((meeting) => (
              <>
                <MeetingroomCard
                  setMeetingSeq={setMeetingSeq}
                  openModal={openModal}
                  key={meeting.meetingSeq}
                  meeting={meeting}
                />
              </>
            ))}
        </div>
        {/* </Row>
        </Container> */}
      </div>

      <div className="studyrecruit-pagination">
        <Paginator currentpage={setCurrentPage} />
      </div>

      <ApplicationModal open={modalOpen} close={closeModal}>
        <div style={{ textAlign: "left", padding: "0 20%" }}>
          카테고리: {selectedMeeting.categoryName}
        </div>
        <div style={{ textAlign: "left", padding: "0 20%" }}>
          호스트 이름: {selectedMeeting.hostName}
        </div>
        <div style={{ textAlign: "left", padding: "0 20%" }}>
          카메라 규칙: {selectedMeeting.meetingCamType}
        </div>
        <div style={{ textAlign: "left", padding: "0 20%" }}>
          현재 인원: {selectedMeeting.meetingHeadcount} / 12
        </div>
        <div style={{ textAlign: "left", padding: "0 20%" }}>
          미팅룸 이름: {selectedMeeting.meetingTitle}
        </div>
        <div style={{ textAlign: "left", padding: "0 20%" }}>
          미팅룸 설명: {selectedMeeting.meetingDesc}
        </div>

        <Link
          to={{
            pathname: `/meeting/${meetingSeq}`,
          }}
        >
          <button
            style={{
              border: "none",
              margin: "2rem",
              backgroundColor: "#6667ab",
              color: "#eeeeee",
            }}
          >
            입실하기
          </button>
        </Link>
      </ApplicationModal>
    </main>
  );
}
