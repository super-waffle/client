import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApplicationModal from "../components/applicationModal";
import "../statics/css/settingsStudy.css";

export default function SettingsStudy() {
  const TOKEN = localStorage.getItem("accessToken");
  const [nickname, setNickname] = useState("");
  const [myStudyDataAll, setMyStudyDataAll] = useState("");
  const [showStudyDetail, setShowStudyDetail] = useState(false);
  const [showStartedStudyDetail, setShowStartedStudyDetail] = useState(false);
  const [studySeq, setStudySeq] = useState("");
  const [memberSeq, setMemberSeq] = useState("");
  const [startedStudySeq, setStartedStudySeq] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const imageURL = "https://i6a301.p.ssafy.io:8080/images/" + profileImg;

  // 스터디 정보 불러오기
  useEffect(() => {
    axios
      .get("/users/studies", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        const data = res.data.studyList;
        setMyStudyDataAll(() => data);
      });
    // 내 정보 불러오기
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/users", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        // console.log(res);
        const USER = res.data.user;
        setNickname(USER.userNickname);
        setProfileImg(USER.userImg);
      });
  }, []);

  // 모집중인 스터디 정보만 저장
  const [myStudyData, setMyStudyData] = useState("");
  useEffect(() => {
    if (myStudyDataAll) {
      const studyRecruiting = myStudyDataAll.filter(
        (study) => study.startDate === null
      );
      setMyStudyData(() => studyRecruiting);
    }
  }, [myStudyDataAll]);

  // 진행중인 스터디 정보만 저장
  const [studyStarted, setStudyStarted] = useState("");
  useEffect(() => {
    if (myStudyDataAll) {
      const started = myStudyDataAll.filter(
        (study) => study.startDate !== null
      );
      setStudyStarted(() => started);
    }
  }, [myStudyDataAll]);

  // 스터디 모집중인지 진행중인지 모집마감인지 스터디 종료인지 판단
  const checkStudyStatus = (study) => {
    if (nickname === study.hostName) {
      if (study.isRecruiting && study.startDate === null) {
        return "모집중";
      }
      if (!study.isRecruiting) {
        return "모집마감";
      }
      if (study.startDate !== null) {
        return "스터디 진행중";
      }
    }
  };

  const numberToDay = (num) => {
    if (num === 1) {
      return "월";
    }
    if (num === 2) {
      return "화";
    }
    if (num === 3) {
      return "수";
    }
    if (num === 4) {
      return "목";
    }
    if (num === 5) {
      return "금";
    }
    if (num === 6) {
      return "토";
    }
    if (num === 7) {
      return "일";
    }
  };

  // 모집중인 스터디에서 선택
  const [selectedStudy, setSelectedStudy] = useState("");
  useEffect(() => {
    if (myStudyData) {
      const selected = myStudyData.filter((seq) => seq.studySeq === studySeq);
      setSelectedStudy(() => selected[0]);
    }
  }, [studySeq]);

  // 진행중인 스터디에서 선택
  const [selectStarted, setSelectStarted] = useState("");
  useEffect(() => {
    if (studyStarted) {
      const selected = studyStarted.filter(
        (study) => study.studySeq === startedStudySeq
      );
      setSelectStarted(() => selected[0]);
    }
  }, [startedStudySeq]);
  // console.log(selectStarted);

  const onClickShowDetail = () => {
    setShowStudyDetail(!showStudyDetail);
  };
  // console.log(selectedStudy);

  // 스터디 신청한 회원들 목록 불러오기
  const [memberApplied, setMemberApplied] = useState("");
  useEffect(() => {
    if (selectedStudy) {
      axios
        .get("/users/studies/" + selectedStudy.studySeq + "/applicants", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.statusCode === 200) {
            const data = res.data.applicants;
            setMemberApplied(() => data);
          }
        });
    }
  }, [selectedStudy.studySeq]);
  // console.log(memberApplied);

  // 스터디 신청한 회원들 좌우 배열하기
  const [appliedLeft, setAppliedLeft] = useState("");
  const [appliedRight, setAppliedRight] = useState("");
  const [acceptedLeft, setAcceptedLeft] = useState("");
  const [acceptedRight, setAcceptedRight] = useState("");
  useEffect(() => {
    if (memberApplied) {
      const selectedleft = memberApplied.filter((member, idx, array) => {
        return idx % 2 === 0;
      });
      setAppliedLeft(() => selectedleft);

      const selectedright = memberApplied.filter((member, idx, array) => {
        return idx % 2 !== 0;
      });
      setAppliedRight(() => selectedright);
    }
    if (selectedStudy) {
      const memberleft = selectedStudy.memberList.filter(
        (member, idx, array) => {
          return idx % 2 === 0;
        }
      );
      setAcceptedLeft(() => memberleft);
      const memberright = selectedStudy.memberList.filter(
        (member, idx, array) => {
          return idx % 2 !== 0;
        }
      );
      setAcceptedRight(() => memberright);
    }
  }, [memberApplied, selectedStudy]);
  // console.log(applied);
  // console.log(appliedLeft, appliedRight, acceptedLeft, acceptedRight);

  // 신청한 회원 프로필 모달창으로 띄우기 위한 정보 저장
  const [selectApplyMemberLeft, setSelectApplyMemberLeft] = useState("");
  const [selectApplyMemberRight, setSelectApplyMemberRight] = useState("");
  const [selectAcceptedMemberLeft, setSelectAcceptedMemberLeft] = useState("");
  const [selectAcceptedMemberRight, setSelectAcceptedMemberRight] =
    useState("");

  useEffect(() => {
    if (memberSeq) {
      // console.log(member.userSeq, memberSeq);
      const data = appliedLeft.filter((member) => member.userSeq === memberSeq);
      setSelectApplyMemberLeft(() => data[0]);
    }
    if (memberSeq) {
      // console.log(member.userSeq, memberSeq);
      const data = appliedRight.filter(
        (member) => member.userSeq === memberSeq
      );
      setSelectApplyMemberRight(() => data[0]);
    }
    if (memberSeq) {
      // console.log(member.userSeq, memberSeq);
      const data = acceptedLeft.filter(
        (member) => member.userSeq === memberSeq
      );
      setSelectAcceptedMemberLeft(() => data[0]);
    }
    if (memberSeq) {
      // console.log(member.userSeq, memberSeq);
      const data = acceptedRight.filter(
        (member) => member.userSeq === memberSeq
      );
      setSelectAcceptedMemberRight(() => data[0]);
    }
  }, [memberSeq, selectApplyMemberLeft]);

  // console.log(
  //   selectApplyMemberLeft,
  //   selectApplyMemberRight,
  //   selectAcceptedMemberLeft,
  //   selectAcceptedMemberRight
  // );

  // 모달창 띄우기
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //모집 마감
  const onClickEndRecruit = () => {
    axios
      .patch(
        process.env.REACT_APP_SERVER_URL +
          "/users/studies/" +
          selectedStudy.studySeq +
          "/recruit-end",
        {},

        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        window.location.reload();
        console.log(res);
      });
  };

  // 스터디 시작하기
  const onClickStartStudy = () => {
    if (selectedStudy.memberList.length > 1) {
      axios
        .patch(
          process.env.REACT_APP_SERVER_URL +
            "/users/studies/" +
            selectedStudy.studySeq +
            "/start",
          {},

          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        )
        .then((res) => {
          window.location.reload();
          console.log(res);
        });
    } else {
      alert("스터디를 시작하기 위해서는 2명 이상의 스터디원이 필요합니다.");
    }
  };
  // console.log(showStudyDetail);

  // 신청 수락
  const onClickAccept = () => {
    axios
      .post(
        "/users/studies/" + selectedStudy.studySeq + "/applicants/" + memberSeq,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        closeModal();
      });
  };

  //신청 거절
  const onClickReject = () => {
    axios
      .delete(
        "/users/studies/" + selectedStudy.studySeq + "/applicants/" + memberSeq,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        closeModal();
        onClickShowDetail();
        // window.location.reload();
      });
  };

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
            {myStudyData &&
              myStudyData.map((study) => (
                <tr
                  key={study.studySeq}
                  className={`settings-study-mystudy ${
                    selectedStudy.studySeq === study.studySeq && showStudyDetail
                      ? "study-selected"
                      : ""
                  } `}
                >
                  <td className="settings-study-mystudy-category">
                    {study.categoryName}
                  </td>
                  <td
                    className="settings-study-mystudy-title"
                    onClick={() => {
                      setStudySeq(study.studySeq);
                      onClickShowDetail();
                    }}
                  >
                    <div className="mystudy-title">{study.title}</div>
                    <div className="mystudy-shorts">
                      {study.shortDescription}
                    </div>
                  </td>
                  <td className="settings-study-mystudy-status">
                    {checkStudyStatus(study)}
                  </td>
                  <td className="settings-study-mystudy-members">
                    {study.memberList.length}/6
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showStudyDetail && (
        <div className="settings-study-members">
          {/* [TODO]: 스터디 신청한 회원들 정보 불러와야함 */}
          <div className="settings-study-members-left">
            <div className="settings-study-members__heading">신청자 목록</div>
            <div className="settings-study-members__queue">
              <div className="queue-left">
                <table>
                  <tbody>
                    {appliedLeft &&
                      appliedLeft.map((member) => (
                        <tr key={member.memberSeq}>
                          <td>
                            {member.userImg}
                            <div className="settings-study-details-img-wrapper">
                              <svg
                                className="settings-study-details-img"
                                width="250"
                                height="250"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_233_15455)">
                                  <path
                                    d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                                    fill="#f4f4f4"
                                  />
                                  <path
                                    d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                                    fill="#c0c0c0"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_233_15455">
                                    <path
                                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              {member.userImg !== null && (
                                <img
                                  className="settings-study-details-img"
                                  src={
                                    "https://i6a301.p.ssafy.io:8080/images/ " +
                                    `${member.userImg}`
                                  }
                                  alt=""
                                />
                              )}
                            </div>
                          </td>
                          <td
                            className="queue-username"
                            onClick={() => {
                              openModal();
                              setMemberSeq(member.userSeq);
                            }}
                          >
                            {member.userNickname}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <tbody>
                    {appliedRight &&
                      appliedRight.map((member) => (
                        <tr key={member.memberSeq}>
                          <td>
                            {member.userImg}
                            <div className="settings-study-details-img-wrapper">
                              <svg
                                className="settings-study-details-img"
                                width="250"
                                height="250"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_233_15455)">
                                  <path
                                    d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                                    fill="#f4f4f4"
                                  />
                                  <path
                                    d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                                    fill="#c0c0c0"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_233_15455">
                                    <path
                                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              {member.userImg !== null && (
                                <img
                                  className="settings-study-details-img"
                                  src={
                                    "https://i6a301.p.ssafy.io:8080/images/ " +
                                    `${member.userImg}`
                                  }
                                  alt=""
                                />
                              )}
                            </div>
                          </td>
                          <td
                            className="queue-username"
                            onClick={() => {
                              openModal();
                              setMemberSeq(member.userSeq);
                            }}
                          >
                            {member.userNickname}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="settings-study-members-right">
            <div className="settings-study-members__heading">참여 스터디원</div>
            <div className="settings-study-members__queue">
              <div className="queue-left">
                <table>
                  <tbody>
                    {acceptedLeft &&
                      acceptedLeft.map((member) => (
                        <tr key={member.memberSeq}>
                          <td>
                            {member.userImg}
                            <div className="settings-study-details-img-wrapper">
                              <svg
                                className="settings-study-details-img"
                                width="250"
                                height="250"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_233_15455)">
                                  <path
                                    d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                                    fill="#f4f4f4"
                                  />
                                  <path
                                    d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                                    fill="#c0c0c0"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_233_15455">
                                    <path
                                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              {nickname === member.userNickname && (
                                <svg
                                  className="host-crown"
                                  width="640"
                                  height="512"
                                  viewBox="0 0 640 512"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M528 448H112C103.2 448 96 455.2 96 464V496C96 504.8 103.2 512 112 512H528C536.8 512 544 504.8 544 496V464C544 455.2 536.8 448 528 448ZM592 128C565.5 128 544 149.5 544 176C544 183.1 545.6 189.7 548.4 195.8L476 239.2C460.6 248.4 440.7 243.2 431.8 227.6L350.3 85C361 76.2 368 63 368 48C368 21.5 346.5 0 320 0C293.5 0 272 21.5 272 48C272 63 279 76.2 289.7 85L208.2 227.6C199.3 243.2 179.3 248.4 164 239.2L91.7 195.8C94.4 189.8 96.1 183.1 96.1 176C96.1 149.5 74.6 128 48.1 128C21.6 128 0 149.5 0 176C0 202.5 21.5 224 48 224C50.6 224 53.2 223.6 55.7 223.2L128 416H512L584.3 223.2C586.8 223.6 589.4 224 592 224C618.5 224 640 202.5 640 176C640 149.5 618.5 128 592 128Z"
                                    fill="#F2C831"
                                  />
                                </svg>
                              )}

                              {/* {member.userImg !== null && (
                                <img
                                  className="settings-study-details-img"
                                  src={
                                    "https://i6a301.p.ssafy.io:8080/images/ " +
                                    `${member.userImg}`
                                  }
                                  alt=""
                                />
                              )} */}
                            </div>
                          </td>
                          <td
                            className="queue-username"
                            onClick={() => {
                              setMemberSeq(member.userSeq);
                              if (nickname !== member.userNickname) {
                                openModal();
                              }
                            }}
                          >
                            {member.userNickname}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <tbody>
                    {acceptedRight &&
                      acceptedRight.map((member) => (
                        <tr key={member.memberSeq}>
                          <td>
                            {member.userImg}
                            <div className="settings-study-details-img-wrapper">
                              <svg
                                className="settings-study-details-img"
                                width="250"
                                height="250"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_233_15455)">
                                  <path
                                    d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                                    fill="#f4f4f4"
                                  />
                                  <path
                                    d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                                    fill="#c0c0c0"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_233_15455">
                                    <path
                                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              {/* <svg
                                width="640"
                                height="512"
                                viewBox="0 0 640 512"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M528 448H112C103.2 448 96 455.2 96 464V496C96 504.8 103.2 512 112 512H528C536.8 512 544 504.8 544 496V464C544 455.2 536.8 448 528 448ZM592 128C565.5 128 544 149.5 544 176C544 183.1 545.6 189.7 548.4 195.8L476 239.2C460.6 248.4 440.7 243.2 431.8 227.6L350.3 85C361 76.2 368 63 368 48C368 21.5 346.5 0 320 0C293.5 0 272 21.5 272 48C272 63 279 76.2 289.7 85L208.2 227.6C199.3 243.2 179.3 248.4 164 239.2L91.7 195.8C94.4 189.8 96.1 183.1 96.1 176C96.1 149.5 74.6 128 48.1 128C21.6 128 0 149.5 0 176C0 202.5 21.5 224 48 224C50.6 224 53.2 223.6 55.7 223.2L128 416H512L584.3 223.2C586.8 223.6 589.4 224 592 224C618.5 224 640 202.5 640 176C640 149.5 618.5 128 592 128Z"
                                  fill="#F2C831"
                                />
                              </svg> */}

                              {/* {member.userImg !== null && (
                                <img
                                  className="settings-study-details-img"
                                  src={
                                    "https://i6a301.p.ssafy.io:8080/images/ " +
                                    `${member.userImg}`
                                  }
                                  alt=""
                                />
                              )} */}
                            </div>
                          </td>
                          <td
                            className="queue-username"
                            onClick={() => {
                              openModal();
                              setMemberSeq(member.userSeq);
                            }}
                          >
                            {member.userNickname}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <ApplicationModal open={modalOpen} close={closeModal} header="">
        {selectApplyMemberLeft && (
          <div className="apply-modal-member">
            <div className="settings-study-details-img-wrapper">
              <svg
                className="settings-study-details-img"
                width="250"
                height="250"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_233_15455)">
                  <path
                    d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                    fill="#f4f4f4"
                  />
                  <path
                    d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                    fill="#c0c0c0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_233_15455">
                    <path
                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
              {selectApplyMemberLeft.userImg !== null && (
                <img
                  className="settings-study-details-img"
                  src={
                    "https://i6a301.p.ssafy.io:8080/images/ " +
                    `${selectApplyMemberLeft.userImg}`
                  }
                  alt=""
                />
              )}
            </div>
            <div className="setting-study-details-profile-content">
              <div className="setting-study-details-profile-header">
                <div className="setting-study-details-profile-content__nickname">
                  {selectApplyMemberLeft.userNickname}
                </div>
                <div className="setting-study-details-profile-content__level">
                  Lv.{selectApplyMemberLeft.userLevel.levelSeq}
                </div>
              </div>

              <div className="setting-study-details-profile-body">
                <div className="setting-study-details-profile-content__time">
                  <div className="content-title">총 공부시간</div>
                  {parseInt(selectApplyMemberLeft.userTimeTotal / 60)}시간{" "}
                  {selectApplyMemberLeft.userTimeTotal -
                    parseInt(selectApplyMemberLeft.userTimeTotal / 60) * 60}
                  분
                </div>
                <div className="setting-study-details-profile-content__warning">
                  <div className="content-title">경고</div>
                  {selectApplyMemberLeft.userWarning}회
                </div>
              </div>
              <div className="setting-study-details-profile-content__message">
                <div className="content-title">신청 메세지</div>
                <div className="content-body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
            </div>
          </div>
        )}
        {selectApplyMemberRight && (
          <div className="apply-modal-member">
            <div className="settings-study-details-img-wrapper">
              <svg
                className="settings-study-details-img"
                width="250"
                height="250"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_233_15455)">
                  <path
                    d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                    fill="#f4f4f4"
                  />
                  <path
                    d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                    fill="#c0c0c0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_233_15455">
                    <path
                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
              {selectApplyMemberRight.userImg !== null && (
                <img
                  className="settings-study-details-img"
                  src={
                    "https://i6a301.p.ssafy.io:8080/images/ " +
                    `${selectApplyMemberRight.userImg}`
                  }
                  alt=""
                />
              )}
            </div>
            <div>{selectApplyMemberRight.userNickname}</div>
          </div>
        )}
        {selectAcceptedMemberLeft && (
          <div className="apply-modal-member">
            <div className="settings-study-details-img-wrapper">
              <svg
                className="settings-study-details-img"
                width="250"
                height="250"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_233_15455)">
                  <path
                    d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                    fill="#f4f4f4"
                  />
                  <path
                    d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                    fill="#c0c0c0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_233_15455">
                    <path
                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
              {selectAcceptedMemberLeft.userImg !== null && (
                <img
                  className="settings-study-details-img"
                  src={
                    "https://i6a301.p.ssafy.io:8080/images/ " +
                    `${selectAcceptedMemberLeft.userImg}`
                  }
                  alt=""
                />
              )}
            </div>
            <div>{selectAcceptedMemberLeft.userNickname}</div>
          </div>
        )}
        {selectAcceptedMemberRight && (
          <div className="apply-modal-member">
            <div className="settings-study-details-img-wrapper">
              <svg
                className="settings-study-details-img"
                width="250"
                height="250"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_233_15455)">
                  <path
                    d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                    fill="#f4f4f4"
                  />
                  <path
                    d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                    fill="#c0c0c0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_233_15455">
                    <path
                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
              {selectAcceptedMemberRight.userImg !== null && (
                <img
                  className="settings-study-details-img"
                  src={
                    "https://i6a301.p.ssafy.io:8080/images/ " +
                    `${selectAcceptedMemberRight.userImg}`
                  }
                  alt=""
                />
              )}
            </div>
            <div>{selectAcceptedMemberRight.userNickname}</div>
          </div>
        )}
        <button onClick={onClickReject} className="btn-reject">
          거절
        </button>
        <button onClick={onClickAccept} className="btn-accept">
          수락
        </button>
      </ApplicationModal>

      {showStudyDetail && (
        <div className="settings-study-details">
          <div className="settings-study-details-box-heading">
            <div className="settings-study-details-box-heading__first">
              {selectedStudy && (
                <div className="settings-study-details-box-heading__title">
                  {selectedStudy.title}
                </div>
              )}
              {selectedStudy && (
                <div className="settings-study-details-box-heading__category">
                  {selectedStudy.categoryName}
                </div>
              )}
            </div>
            <div className="settings-study-details-box-heading__first-host">
              {/* [TODO]: update, delete 페이지로 링크 필요 */}
              <Link
                to={"/"}
                className="settings-study-details-box-heading__first-host-btn update"
              >
                수정
              </Link>
              <Link
                to={"/"}
                className="settings-study-details-box-heading__first-host-btn"
              >
                삭제
              </Link>
            </div>
          </div>
          <div className="settings-study-details-box-heading__second">
            {selectedStudy && (
              <div className="settings-study-details-img-wrapper">
                <svg
                  className="settings-study-details-img"
                  width="250"
                  height="250"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_233_15455)">
                    <path
                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                      fill="#f4f4f4"
                    />
                    <path
                      d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                      fill="#c0c0c0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_233_15455">
                      <path
                        d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                        fill="white"
                      />
                    </clipPath>
                  </defs>
                </svg>
                {selectedStudy.hostImg !== null && (
                  <img
                    className="settings-study-details-img"
                    src={imageURL}
                    alt=""
                  />
                )}
              </div>
            )}
            {selectedStudy && (
              <div className="settings-study-details-box-heading__nickname">
                {selectedStudy.hostName}
              </div>
            )}
          </div>
          <hr></hr>
          <div className="settings-study-details-box-body">
            <div className="settings-study-details-box-body__time">
              {/* <table>
                <tbody>
                  <tr>
                    <td>스터디원</td>
                    {selectedStudy.memberList &&
                      selectedStudy.memberList.map((member) => (
                        <td>{member.userNickname}</td>
                      ))}
                  </tr>
                </tbody>
              </table> */}
              <table>
                <tbody>
                  <tr className="settings-study-details-box-body__row">
                    <td className="settings-study-details-box-body__title">
                      스터디 일정
                    </td>
                    {selectedStudy.days &&
                      selectedStudy.days.map((day) => (
                        <td key={day.dayNumber}>
                          <div className="settings-study-details-box-body__days">
                            <div className="settings-study-details-box-body__day name">
                              {numberToDay(day.dayNumber)}
                            </div>
                            <div className="settings-study-details-box-body__day timestart">
                              {day.startTime.slice(0, 5)} ~
                            </div>
                            <div className="settings-study-details-box-body__day timeend">
                              {day.endTime.slice(0, 5)}
                            </div>
                          </div>
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr className="settings-study-details-box-body__row">
                    <td className="settings-study-details-box-body__title">
                      모집 기간
                    </td>
                    {selectedStudy && (
                      <td className="settings-study-details-box-body__enddate">
                        {selectedStudy.recruitStartDate} ~
                        {selectedStudy.recruitEndDate}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            {selectedStudy && (
              <div className="settings-study-details-box-body__shortdesc">
                {selectedStudy.shortDescription}
              </div>
            )}
            {selectedStudy && (
              <div className="settings-study-details-box-body__desc">
                {selectedStudy.description}
              </div>
            )}
          </div>
          {selectedStudy.isRecruiting && (
            <div className="settings-study-details__btns">
              <button
                className="settings-study-details__btn end-recruit"
                onClick={onClickEndRecruit}
              >
                모집 마감
              </button>
              {selectedStudy.startDate === null ? (
                <button
                  className="settings-study-details__btn start-study"
                  onClick={onClickStartStudy}
                >
                  스터디 시작하기
                </button>
              ) : (
                <button className="settings-study-details__btn end-study">
                  스터디 종료하기
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div className="settings-study-heading">
        <div className="settings-study-heading__h1 second-box">
          진행중인 스터디
        </div>
        <div className="settings-study-heading__h2">
          시작된 스터디 정보를 확인하고 관리할 수 있습니다
        </div>
      </div>

      <div className="settings-study-mystudies">
        <table>
          <tbody>
            {studyStarted &&
              studyStarted.map((study) => (
                <tr
                  key={study.studySeq}
                  className={`settings-study-mystudy ${
                    // checkStudyStatus(study) === "모집중"
                    //   ? "not-check"
                    //   : "is-check"
                    selectStarted.studySeq === study.studySeq &&
                    showStartedStudyDetail
                      ? "study-selected"
                      : ""
                  } `}
                >
                  <td className="settings-study-mystudy-category">
                    {study.categoryName}
                  </td>
                  <td
                    className="settings-study-mystudy-title"
                    onClick={() => {
                      setShowStartedStudyDetail(!showStartedStudyDetail);
                      // onClickShowDetail();
                      setStartedStudySeq(study.studySeq);
                    }}
                  >
                    <div className="mystudy-title">{study.title}</div>
                    <div className="mystudy-shorts">
                      {study.shortDescription}
                    </div>
                  </td>
                  <td className="settings-study-mystudy-status">
                    {checkStudyStatus(study)}
                  </td>
                  <td className="settings-study-mystudy-members">
                    {study.memberList.length}/6
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showStartedStudyDetail && (
        <div className="settings-study-details">
          <div className="settings-study-details-box-heading">
            <div className="settings-study-details-box-heading__first">
              {selectStarted && (
                <div className="settings-study-details-box-heading__title">
                  {selectStarted.title}
                </div>
              )}
              {selectStarted && (
                <div className="settings-study-details-box-heading__category">
                  {selectStarted.categoryName}
                </div>
              )}
            </div>
            <div className="settings-study-details-box-heading__first-host">
              {/* [TODO]: update, delete 페이지로 링크 필요 */}
              <Link
                to={"/"}
                className="settings-study-details-box-heading__first-host-btn update"
              >
                수정
              </Link>
              <Link
                to={"/"}
                className="settings-study-details-box-heading__first-host-btn"
              >
                삭제
              </Link>
            </div>
          </div>
          <div className="settings-study-details-box-heading__second">
            {selectStarted && (
              <div className="settings-study-details-img-wrapper">
                <svg
                  className="settings-study-details-img"
                  width="250"
                  height="250"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_233_15455)">
                    <path
                      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                      fill="#f4f4f4"
                    />
                    <path
                      d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                      fill="#c0c0c0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_233_15455">
                      <path
                        d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                        fill="white"
                      />
                    </clipPath>
                  </defs>
                </svg>
                {selectStarted.hostImg !== null && (
                  <img
                    className="settings-study-details-img"
                    src={imageURL}
                    alt=""
                  />
                )}
              </div>
            )}
            {selectStarted && (
              <div className="settings-study-details-box-heading__nickname">
                {selectStarted.hostName}
              </div>
            )}
          </div>
          <hr></hr>
          <div className="settings-study-details-box-body">
            <div className="settings-study-details-box-body__time">
              {/* <table>
                <tbody>
                  <tr>
                    <td>스터디원</td>
                    {selectStarted.memberList &&
                      selectStarted.memberList.map((member) => (
                        <td>{member.userNickname}</td>
                      ))}
                  </tr>
                </tbody>
              </table> */}
              <table>
                <tbody>
                  <tr className="settings-study-details-box-body__row">
                    <td className="settings-study-details-box-body__title">
                      스터디 일정
                    </td>
                    {selectStarted.days &&
                      selectStarted.days.map((day) => (
                        <td key={day.dayNumber}>
                          <div className="settings-study-details-box-body__days">
                            <div className="settings-study-details-box-body__day name">
                              {numberToDay(day.dayNumber)}
                            </div>
                            <div className="settings-study-details-box-body__day timestart">
                              {day.startTime.slice(0, 5)} ~
                            </div>
                            <div className="settings-study-details-box-body__day timeend">
                              {day.endTime.slice(0, 5)}
                            </div>
                          </div>
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr className="settings-study-details-box-body__row">
                    <td className="settings-study-details-box-body__title">
                      모집 기간
                    </td>
                    {selectStarted && (
                      <td className="settings-study-details-box-body__enddate">
                        {selectStarted.recruitStartDate} ~
                        {selectStarted.recruitEndDate}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            {selectStarted && (
              <div className="settings-study-details-box-body__shortdesc">
                {selectStarted.shortDescription}
              </div>
            )}
            {selectStarted && (
              <div className="settings-study-details-box-body__desc">
                {selectStarted.description}
              </div>
            )}
          </div>
          {selectStarted.isRecruiting && (
            <div className="settings-study-details__btns">
              <button
                className="settings-study-details__btn end-recruit"
                onClick={onClickEndRecruit}
              >
                모집 마감
              </button>
              {selectStarted.startDate === null ? (
                <button
                  className="settings-study-details__btn start-study"
                  onClick={onClickStartStudy}
                >
                  스터디 시작하기
                </button>
              ) : (
                <button className="settings-study-details__btn end-study">
                  스터디 종료하기
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
