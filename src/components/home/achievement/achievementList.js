import axios from "axios";
import React from "react";
import ReactTooltip from "react-tooltip";
import { useState, useEffect } from "react";
import "../../../statics/css/home/achievementList.css";

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
  const [AchieveImg, setAchieveImage] = useState("");

  useEffect(() => {
    if (achieve.achieveImg) {
      setAchieveImage(
        "https://i6a301.p.ssafy.io:8080/images/" + achieve.achieveImg
      );
    }
  }, [achieve]);
  // const AchieveImg =
  //   "https://i6a301.p.ssafy.io:8080/images/" + achieve.achieveImg;
  const DefaultImg = "/images/achievement.jpg";

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
      className={`achievement-card ${
        mainachieveSeq === achieve.achieveSeq ? "card-selected" : ""
      }`}
      style={{ cursor: isHave ? "pointer" : "" }}
      data-tip="React-tooltip"
      data-for={achieve.achieveName}
      onLoad={haveAchieve}
      onClick={isHave ? onClick : null}
    >
      <div className="achievement-card__img">
        <img src={isHave ? AchieveImg : DefaultImg} />
      </div>

      {isHave && (
        <ReactTooltip id={achieve.achieveName} type="light">
          {achieve.achieveContent}
        </ReactTooltip>
      )}
      {isHave ? (
        <div className="achievement-card__text">{achieve.achieveName}</div>
      ) : (
        <div className="achievement-card__text"> ..</div>
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

  async function getMainAchieve() {
    await axios
      .get(process.env.REACT_APP_SERVER_URL + "/achievements/active", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        if (res.data.achieveActive) {
          let data = res.data.achieveActive.achieve.achieveSeq;
          setMainachieveSeq(() => data);
        }
      });
  }

  useEffect(() => {
    getAchieve();
    getMainAchieve();
  }, []);

  return (
    <div className="achievement-list">
      {postData.data &&
        postData.data.map((achieve) => (
          <div className="achievement-list-grid" key={achieve.achieveSeq}>
            <AchievementCard
              achieve={achieve}
              userAcheieve={userAcheieve}
              mainachieveSeq={mainachieveSeq}
              setMainachieveSeq={setMainachieveSeq}
              setAchieveImg={setAchieveImg}
              setAchieveName={setAchieveName}
              setAchieveCount={setAchieveCount}
              achieveCount={achieveCount}
            />
          </div>
        ))}
    </div>
  );
}
