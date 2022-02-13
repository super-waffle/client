import axios from 'axios';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ApplicationModal from '../components/applicationModal';
import {
  setNickname,
  setUserSeq,
  setProfileImg,
  setSelectedSeq,
} from '../components/settings/settingsSlice';
import '../statics/css/settingsStudy.css';
import RecruitingStudy from '../components/settings/recrutingStudy';
import StudyInfo from '../components/settings/studyInfo';
import StudyPersonnel from '../components/settings/studyPersonnel';

export default function SettingsStudy() {
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
        (study) =>
          study.isRecruiting &&
          study.startDate === null &&
          study.hostName === nickname
      ),
    [studyList]
  );
  const [selectedSeq, setSelectedSeq] = useState('');
  const selectedStudy = useMemo(
    () => studyList.filter((study) => study.studySeq === selectedSeq)[0]
  );
  const [applicants, setApplicants] = useState('');
  const [members, setMembers] = useState('');
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
    setStudyList(response.data.studyList);
  }
  useEffect(() => {
    getUser();
    getStudies();
  }, []);

  async function getApplicant() {
    const response = await axios
      .get(`/users/studies/${selectedSeq}/applicants`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          const data = response.data.applicants;
          console.log(data, 'get applicant');
          setApplicants(() => data);
        } else {
          setApplicants(() => []);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (selectedStudy) {
      getApplicant();
      setMembers(() => selectedStudy.memberList);
    }
  }, [selectedSeq]);
  // console.log(selectedStudy);
  // console.log(applicants);
  // console.log(applicants.length);
  return (
    <div className="settings-study">
      <div className="settings-study-heading">
        <div className="settings-study-heading__h1">모집중인 스터디</div>
        <div className="settings-study-heading__h2">
          내가 모집중인 스터디 정보를 확인하고 관리할 수 있습니다
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
                  setSelectedSeq={setSelectedSeq}
                />
              ))}
          </tbody>
        </table>
      </div>
      {applicants && members && (
        <StudyPersonnel applicants={applicants} members={members} />
      )}
      {selectedStudy && (
        <StudyInfo selectedStudy={selectedStudy} imageURL={imageURL} />
      )}
      <hr></hr>
      <div className="settings-study-heading">
        <div className="settings-study-heading__h1 second-box">
          진행중인 스터디
        </div>
        <div className="settings-study-heading__h2">
          시작된 스터디 정보를 확인하고 관리할 수 있습니다
        </div>
      </div>
    </div>
  );
}
