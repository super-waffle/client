import axios from "axios";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { Container, Col, Row, Card } from "react-bootstrap";

export default function AchievementCard(
  achieve,
  userAcheieve,
  mainachieveSeq,
  setMainachieveSeq,
  setAchieveImg,
  setAchieveName,
  setAchieveCount,
  achieveCount
) {
  console.log("achieve:", achieve);
  console.log("userAcheieve:", userAcheieve);
  console.log("mainachieveSeq:", mainachieveSeq);
  console.log("setMainachieveSeq:", setMainachieveSeq);
  console.log("setAchieveName:", setAchieveName);
  console.log("setAchieveCount:", setAchieveCount);

  const TOKEN = localStorage.getItem("accessToken");
  const [isHave, setIsHave] = useState(false);
  // console.log(userAcheieve);
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
      data-tip="React-tooltip"
      data-for={achieve.achieveName}
      onLoad={haveAchieve}
      onClick={isHave ? onClick : null}
    >
      {/* <Col
        style={{ marginBottom: "0.5rem", cursor: isHave ? "pointer" : "" }}
        data-tip="React-tooltip"
        data-for={achieve.achieveName}
        onLoad={haveAchieve}
        onClick={isHave ? onClick : null}
      > */}
      <Card style={{ marginBottom: "0.5rem" }}>
        <Card.Img
          style={{ Height: "0.1rem" }}
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
      </Card>
      {isHave ? (
        <div
          style={{
            fontFamily: "pretendard",
          }}
        >
          {achieve.achieveName}
        </div>
      ) : (
        <div>...</div>
      )}
      {/* </Col> */}
    </div>
  );
}
