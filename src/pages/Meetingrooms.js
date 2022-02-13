import { Container, Col, Row, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import CategorySelect from "../components/categorySelect";
import Paginator from "../components/paginator";
import "../statics/css/studyRecruit.css";
import isLogin from "../utils/isLogin";

const MeetingroomCard = ({ meeting }) => {
  const meetingroomImg =
    "https://i6a301.p.ssafy.io:8080/images/" + meeting.meetingImg;
  const defaultImg = "images/meetingroom.png";
  return (
    <Col lg={3} style={{ marginBottom: "0.5rem" }}>
      <Card style={{ marginBottom: "0.5rem" }}>
        <Card.Img
          style={{ maxHeight: "10rem" }}
          src={meeting.meetingImg ? meetingroomImg : defaultImg}
        />
      </Card>
      <div
        style={{
          fontFamily: "pretendard",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
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
          console.log(data);
          setPostData((prevState) => ({
            ...prevState,
            data,
          }));
        });
    }
  }, [currentPage, category, searchInput]);
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
            {console.log(postData)}
            {postData.data &&
              postData.data.map((meeting) => (
                <MeetingroomCard key={meeting.meetingSeq} meeting={meeting} />
              ))}
          </Row>
        </Container>
      </div>

      <div className="studyrecruit-pagination">
        <Paginator currentpage={setCurrentPage} />
      </div>
    </main>
  );
}
