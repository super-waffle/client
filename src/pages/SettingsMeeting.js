import axios from 'axios';
import { useState, useEffect } from 'react';

import ReadMeeting from '../components/settings/readMeeting';
import EditMeeting from '../components/settings/editMeeting';
import CreateMeeting from '../components/settings/createMeeting';

export default function SettingsMeeting() {
  const [isExist, setIsExist] = useState(false);
  const [wantEdit, setWantEdit] = useState(false);

  const checkExist = async () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/users/meetings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          setIsExist(() => true);
        } else {
          setIsExist(() => false);
        }
      });
  };
  useEffect(() => {
    checkExist();
  }, []);
  return (
    <div className="settings-study">
      <div className="settings-study-heading">
        <div className="settings-study-heading__h1">내 자유열람실 관리</div>
        <div className="settings-study-heading__h2">내 자유열람실을 관리할 수 있습니다</div>
      </div>
      {isExist ? (
        <div>
          {wantEdit ? (
            <EditMeeting setIsExist={setIsExist} setWantEdit={setWantEdit} />
          ) : (
            <ReadMeeting setWantEdit={setWantEdit} />
          )}
        </div>
      ) : (
        <CreateMeeting setIsExist={setIsExist} setWantEdit={setWantEdit} />
      )}
    </div>
  );
}
