import axios from 'axios';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useState, useEffect } from 'react';
import { Container, Col, Row, Card, Overlay } from 'react-bootstrap';
import '../../statics/css/studyRecruit.css';
const TOKEN = localStorage.getItem('accessToken');
//업적이름, 업적이미지, 업적 내용(툴팁)
const AchievementCard = ({ achieve, userAcheieve }) => {
  const [isHave, setIsHave] = useState(false);
  const AchieveImg =
    'https://i6a301.p.ssafy.io:8080/images/' + achieve.achieveImg;
  const DefaultImg = '/images/achievement.jpg';
  // console.log(achieve.achieve.achieveImg);

  const haveAchieve = () => {
    // console.log(achieve.achieveSeq);
    // console.log(userAcheieve);
    // console.log(TOKEN);
    const isfun = Array.from(userAcheieve.data2).includes(achieve.achieveSeq);
    console.log(isfun);
    setIsHave(isfun);
  };
  const selectMainAchieve=async ()=>{
    await axios
    .patch(process.env.REACT_APP_SERVER_URL + '/achievements/'+achieve.achieveSeq, {},{
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    .then((res) => {
      if (res.data.statusCode == 200) {
        console.log("성공: ", res);
      }
    });
  }
  return (
    <Col
      lg={2}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      data-tip="React-tooltip"
      data-for={achieve.achieveName}
      onLoad={haveAchieve}
      onClick={selectMainAchieve}
    >
      <Card style={{ marginBottom: '0.5rem' }}>
        <Card.Img
          style={{ Height: '0.1rem' }}
          src={isHave ? AchieveImg : DefaultImg}
        />
        {isHave && (
          <ReactTooltip id={achieve.achieveName} type="light">
            {achieve.achieveContent}
          </ReactTooltip>
        )}
      </Card>
      {isHave ? (
        <div
          style={{
            fontFamily: 'pretendard',
          }}
        >
          {achieve.achieveName}
        </div>
      ):(
        <div>...</div>
      )}
    </Col>
  );
};

export default function AchievementList() {
  
  const [postData, setPostData] = useState([]);
  const [userAcheieve, setUserAcheieve] = useState();
  //   const [achieveSeq, setAchieveSeq] = useState('');
  async function getAchieve() {
      await axios
      .get(process.env.REACT_APP_SERVER_URL + '/achievements', {
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
      });
  }
  useEffect( () => {
    getAchieve();
  }, []);

  return (
    <div>
      <Container style={{ marginTop: '0.5rem', padding: '0rem' }}>
        <Row className="studyrecruit-board">
          {postData.data &&
            postData.data.map((achieve) => (
              <Col lg={6} md={6} sm={6}>
                <AchievementCard
                  achieve={achieve}
                  key={achieve.achieveSeq}
                  userAcheieve={userAcheieve}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
