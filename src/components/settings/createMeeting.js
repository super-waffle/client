import { useState } from 'react';
import axios from 'axios';
import CategorySelect from '../categorySelect';

export default function CreateMeeting({ setIsExist, setWantEdit }) {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [category, setCategory] = useState('');
  const [meetingDesc, setMeetingDesc] = useState('');
  const onCreateMeeting = async () => {
    var data = new FormData();
    data.append('CategorySeq', category);
    data.append('meetingTitle', meetingTitle);
    data.append('meetingDesc', meetingDesc);
    data.append('meetingCamType', 0);
    data.append('meetingMicType', 0);
    axios
      .post(process.env.REACT_APP_SERVER_URL + '/meetings', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setIsExist(true);
        setWantEdit(false);
      });
  };
  return (
    <div>
      <div>자유열람실 생성</div>
      <div>생성된 자유열람실이 없습니다. 자유열람실을 생성해주세요.</div>
      <div>카테고리 선택: {setCategory && <CategorySelect categoryseq={setCategory} />}</div>
      <div>
        자유열람실 이름:{' '}
        <input type="text" defaultValue={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} />{' '}
      </div>
      <div>
        자유열람실 설명:{' '}
        <input type="textarea" defaultValue={meetingDesc} onChange={(e) => setMeetingDesc(e.target.value)}></input>
      </div>

      <button onClick={onCreateMeeting}>자유열람실 생성</button>
    </div>
  );
}
