import axios from 'axios';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  setNickname,
  setUserSeq,
  setProfileImg,
} from '../components/settings/settingsSlice';
import '../statics/css/settingsStudy.css';
import RecruitingStudy from '../components/settings/recrutingStudy';
import StudyInfoApplied from '../components/settings/studyInfoApplied';
import StudyPersonnel from '../components/settings/studyPersonnel';

export default function SettingsStudyApplied() {
  const TOKEN = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.settings.nickname);
  const userSeq = useSelector((state) => state.settings.userSeq);
  const profileImg = useSelector((state) => state.settings.profileImg);
  const imageURL = 'https://i6a301.p.ssafy.io:8080/images/' + profileImg;
  const [studyList, setStudyList] = useState([]);
  const onRecruitStudies = useMemo(
    () =>
      studyList.filter(
        (study) => study.isRecruiting && study.startDate !== null
      ),
    [studyList]
  );
  const [selectedSeq, setSelectedSeq] = useState('');
  const selectedStudy = useMemo(
    () => studyList.filter((study) => study.studySeq === selectedSeq)[0]
  );
  const applicants = null;
  const [members, setMembers] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState('');
  const [showStudyDetail, setShowStudyDetail] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);

  async function getUser() {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + '/users',
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const userData = response.data.user;
    dispatch(setNickname(userData.userNickname));
    dispatch(setUserSeq(userData.userSeq));
    dispatch(setProfileImg(userData.userImg));
  }

  async function getStudies() {
    const response = await axios.get('/users/studies', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    setStudyList(() => response.data.studyList);
  }
  useEffect(() => {
    getUser();
    getStudies();
  }, []);

  useEffect(() => {
    if (selectedStudy) {
      setMembers(() => selectedStudy.memberList);
    }
  }, [selectedSeq]);
  console.log(selectedStudy);
  return (
    <div className="settings-study">
      <div className="settings-study-heading">
        <div className="settings-study-heading__h1">진행중인 스터디</div>
        <div className="settings-study-heading__h2">
          시작된 스터디 정보를 확인하고 관리할 수 있습니다
        </div>
      </div>
      <div className="settings-study-mystudies">
        <table>
          <tbody>
            {onRecruitStudies &&
              onRecruitStudies.map((study) => (
                <RecruitingStudy
                  key={study.studySeq}
                  study={study}
                  nickname={nickname}
                  selectedStudySeq={
                    selectedStudy ? selectedStudy.studySeq : null
                  }
                  setSelectedSeq={setSelectedSeq}
                  setShowStudyDetail={setShowStudyDetail}
                />
              ))}
          </tbody>
        </table>
      </div>

      {selectedStudy && showStudyDetail && (
        <StudyInfoApplied
          selectedStudy={selectedStudy}
          imageURL={imageURL}
          nickname={nickname}
          setStudyList={setStudyList}
        />
      )}
    </div>
  );
}
