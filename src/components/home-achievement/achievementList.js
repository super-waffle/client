import axios from 'axios';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useState, useEffect, useRef } from 'react';
import { Container, Col, Row, Card, Overlay } from 'react-bootstrap';
import '../../statics/css/studyRecruit.css';

//업적이름, 업적이미지, 업적 내용(호버링)
const AchievementCard = ({ achieve }) => {
  const AchieveImg =
    'https://i6a301.p.ssafy.io:8080/images/' + achieve.achieve.achieveImg;
  const DefaultImg = 'images/achievement.jpg';
  // console.log(achieve.achieve.achieveImg);
  return (
    <Col lg={2} style={{ marginBottom: '0.5rem', cursor: 'pointer' }} >
      <Card style={{ marginBottom: '0.5rem' }} >
        <Card.Img
          style={{ Height: '0.1rem' }}
          src={achieve.achieve.achieveImg ? AchieveImg : DefaultImg}
        />
      </Card>
      <div
      // style={{
      //   fontFamily: 'pretendard',
      // }}
      >
        {achieve.achieve.achieveName}
        {achieve.achieve.achieveContent}
      </div>
      
    </Col>
  );
};



export default function AchievementList() {
  const TOKEN = localStorage.getItem('accessToken');
  const [postData, setPostData] = useState([]);
  //   const [achieveSeq, setAchieveSeq] = useState('');

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/achievements', {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        // console.log(res.data.achievementList)
        let data = res.data.achievementList;
        setPostData((prevState) => ({
          ...prevState,
          data,
        }));
      });
  });

  return (
    <div>
      <Container style={{ marginTop: '0.5rem', padding: '0rem' }}>
        <Row className="studyrecruit-board">
          {postData.data &&
            postData.data.map((achieve) => (
              <div>
                <div>{achieve.achieveSeq}</div>
                <AchievementCard
                  achieve={achieve}
                  key={achieve.achieveSeq}
                  data-tip data-for='content'
                  // setAchieveSeq={setAchieveSeq}
                />
                {/* <ReactTooltip id="content" type="light">
                  <span>{achieve.achieve.achieveContent}</span>
                </ReactTooltip> */}
              </div>
            ))}
        </Row>
      </Container>
      
    </div>
  );
}
