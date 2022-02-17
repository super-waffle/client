import { useEffect, useState } from 'react';
import CategorySelect from '../categorySelect';
import axios from 'axios';

export default function EditMeeting({ setWantEdit, setIsExist }) {
  const [myMeeting, setMyMeeting] = useState();
  const [meetingSeq, setMeetingSeq] = useState();
  const [category, setCategory] = useState();
  const [meetingTitle, setMeetingTitle] = useState();
  const [meetingDesc, setMeetingDesc] = useState();

  const getMyMeeting = async () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/users/meetings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setMyMeeting(() => response.data.meetingInfo);
        setMeetingSeq(() => response.data.meetingInfo.meetingSeq);
        setCategory(() => response.data.meetingInfo.categoryseq);
        setMeetingTitle(() => response.data.meetingInfo.meetingTitle);
        setMeetingDesc(() => response.data.meetingInfo.meetingDesc);
      });
  };
  useEffect(() => {
    getMyMeeting();
  }, []);
  const onSaveChange = async () => {
    var data = new FormData();
    data.append('meetingSeq', meetingSeq);
    data.append('categorySeq', category);
    data.append('meetingTitle', meetingTitle);
    data.append('meetingDesc', meetingDesc);
    data.append('meetingCamType', 0);
    data.append('meetingMicType', 0);
    await axios
      .patch(process.env.REACT_APP_SERVER_URL + `/users/meetings/${meetingSeq}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setWantEdit(() => false);
        setIsExist(() => true);
      });
  };
  const onDelete = async () => {
    await axios
      .delete(process.env.REACT_APP_SERVER_URL + `/users/meetings/${meetingSeq}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setWantEdit(() => false);
        setIsExist(() => false);
      });
  };
  return (
    <div>
      <div>미팅룸 수정</div>
      {myMeeting && (
        <div>
          <div>
            자유열람실 카테고리: <CategorySelect categoryseq={setCategory} />
          </div>
          <div>
            자유열람실 이름:{' '}
            <input defaultValue={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)}></input>
          </div>
          <div>
            미팅룸 설명: <textarea defaultValue={meetingDesc} onChange={(e) => setMeetingDesc(e.target.value)} />
          </div>
        </div>
      )}
      <button onClick={onSaveChange}>수정</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
}
