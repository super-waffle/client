import axios from "axios";
import React from "react";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "../../../statics/css/home/achievementList.css";
// import "../../../statics/css/studyRecruit.css";
// import AchievementCard from "./achievementCard";
const TOKEN = localStorage.getItem("accessToken");
// 업적이름, 업적이미지, 업적 내용(툴팁)
const AchievementCard = ({
  achieve,
  userAcheieve,
  mainachieveSeq,
  setMainachieveSeq,
  setAchieveImg,
  setAchieveName,
  setAchieveCount,
  achieveCount,
}) => {
  const [isHave, setIsHave] = useState(false);

  const AchieveImg =
    "https://i6a301.p.ssafy.io:8080/images/" + achieve.achieveImg;
  const DefaultImg = "/images/achievement.jpg";
  // console.log(achieve.achieve.achieveImg);

  const haveAchieve = () => {
    const isfun = Array.from(userAcheieve.data2).includes(achieve.achieveSeq);
    // console.log(isfun);
    setIsHave(isfun);
    if (isHave) {
      setAchieveCount(achieveCount + 1);
    }
  };
  const selectMainAchieve = async () => {
    await axios
      .patch(
        process.env.REACT_APP_SERVER_URL +
          "/achievements/" +
          achieve.achieveSeq,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        if (res.data.statusCode == 201) {
          let data = res.data.activeAchieveSeq;
          setMainachieveSeq(() => data);
          // console.log('성공: ', res);
        }
      });
  };

  const onClick = () => {
    selectMainAchieve();
    setAchieveImg(achieve.achieveImg);
    setAchieveName(achieve.achieveName);
  };

  return (
    <div
      className="achievement-card"
      style={{ cursor: isHave ? "pointer" : "" }}
      data-tip="React-tooltip"
      data-for={achieve.achieveName}
      onLoad={haveAchieve}
      onClick={isHave ? onClick : null}
    >
      {/* <Card> */}
      {/* <div> */}
      {/* <Card.Img */}
      <img
        // style={{ Height: "0.1rem" }}
        src={isHave ? AchieveImg : DefaultImg}
      />
      {mainachieveSeq === achieve.achieveSeq && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12L10 18L20 6"
            stroke="#2F8A38"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {isHave && (
        <ReactTooltip id={achieve.achieveName} type="light">
          {achieve.achieveContent}
        </ReactTooltip>
      )}
      {/* </div> */}
      {/* </Card> */}
      {isHave ? (
        <div
          style={{
            fontFamily: "pretendard",
          }}
        >
          {achieve.achieveName}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default function AchievementList({
  setAchieveImg,
  setAchieveName,
  setAchieveTotalCount,
  setAchieveCount,
  achieveCount,
}) {
  const [postData, setPostData] = useState([]);
  const [userAcheieve, setUserAcheieve] = useState();
  const [mainachieveSeq, setMainachieveSeq] = useState();
  //   const [achieveSeq, setAchieveSeq] = useState('');
  async function getAchieve() {
    await axios
      .get(process.env.REACT_APP_SERVER_URL + "/achievements", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        let data = res.data.achievementList;
        let data2 = res.data.achieveSeqList;
        setUserAcheieve((prevState) => ({
          ...prevState,
          data2,
        }));
        setPostData((prevState) => ({
          ...prevState,
          data,
        }));
        setAchieveTotalCount(data.length);
      });
  }
  console.log(postData, userAcheieve);
  async function getMainAchieve() {
    await axios
      .get(process.env.REACT_APP_SERVER_URL + "/achievements/active", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        let data = res.data.achieveActive.achieve.achieveSeq;
        setMainachieveSeq(() => data);
      });
  }

  useEffect(() => {
    getAchieve();
    getMainAchieve();
  }, []);
  // console.log(mainachieveSeq);
  return (
    <div className="achievement-list">
      {postData.data &&
        // userAcheieve &&
        // mainachieveSeq &&
        postData.data.map((achieve) => (
          // <Col key  lg={2} md={2} sm={2}>
          <div className="achievement-list-grid" key={achieve.achieveSeq}>
            <AchievementCard
              achieve={achieve}
              // key={achieve.achieveSeq}
              userAcheieve={userAcheieve}
              mainachieveSeq={mainachieveSeq}
              setMainachieveSeq={setMainachieveSeq}
              setAchieveImg={setAchieveImg}
              setAchieveName={setAchieveName}
              setAchieveCount={setAchieveCount}
              achieveCount={achieveCount}
            />
          </div>
          // </Col>
        ))}
    </div>
  );
}
