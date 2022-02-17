import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReadMeeting({ setWantEdit }) {
  const [myMeeting, setMyMeeting] = useState();
  const toEdit = () => {
    setWantEdit(() => true);
  };
  const getMyMeeting = async () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/users/meetings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response);
        setMyMeeting(() => response.data.meetingInfo);
      });
  };
  useEffect(() => {
    getMyMeeting();
  }, []);
  return (
    <div>
      <div>미팅룸 조회</div>
      <button onClick={toEdit}>수정</button>
      {myMeeting && (
        <div>
          <div>자유열람실 이름: {myMeeting.meetingTitle}</div>
          <div>자유열람실 카테고리: {myMeeting.category.categoryName}</div>
          <div>현재 이용 중인 유저: {myMeeting.meetingHeadcount} 명</div>
          <div>미팅룸 설명: {myMeeting.meetingDesc}</div>
        </div>
      )}
    </div>
  );
}
