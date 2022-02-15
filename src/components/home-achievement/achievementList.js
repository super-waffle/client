import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';

//업적이름, 업적이미지, 업적 내용(호버링)
const AchievementCard = ({achieve}) => {
  const achieveImg =
    `https://i6a301.p.ssafy.io:8080/images/${achieve.achieveImg}`;
  const defaultImg = "images/achievement.jpg";
  return (
    <Col
      lg={6}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      onClick={() => {}}
    >
      <Card style={{ marginBottom: '0.5rem' }}>
        <Card.Img
          style={{ maxHeight: '10rem' }}
          src={achieve.achieveImg ? achieveImg : defaultImg}
        />
      </Card>
      <div
        // style={{
        //   fontFamily: 'pretendard',
        // }}
      >
        {achieve.achieveName}
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
        //   console.log(res.data.achievementList)
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
        <Row>
          {postData.data &&
            postData.data.map((achieve) => (
                <div>
                    <div>{achieve.achieveSeq}</div>
              <AchievementCard
                achieve={achieve}
                key={achieve.achieveSeq}
                // setAchieveSeq={setAchieveSeq}
              />
              </div>
            ))}
        </Row>
      </Container>
      <div>dkdkdkddk</div>
    </div>
  );
}
