import axios from "axios";
import { useEffect, useState } from "react";
import "../../../statics/css/home/homeStudiesList.css";
import Modal from "./../../modal";
import { Link } from "react-router-dom";

export default function HomeStudies() {
  const TOKEN = localStorage.getItem("accessToken");
  const [studies, setStudies] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const openModal = () => {
    setModalStatus(true);
  };
  const closeModal = () => {
    setModalStatus(false);
  };
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/users/studies/today", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          const data = res.data.studyList;
          setStudies(() => data);
        }
      });
  }, []);

  return (
    <div className="home-todays-studyrooms-row">
      {studies &&
        studies.map((study, index) => (
          <div key={index}>
            {localStorage.setItem("studySeq", study.studySeq)}
            <div
              className="home-study-box"
              key={index}
              onClick={openModal}
              style={{ cursor: "pointer" }}
            >
              <div className="home-study-box__top">
                <div className="home-study-box__top-category">
                  {study.categoryName}
                </div>
                <div className="home-study-box__top-title">{study.title}</div>
                {study.days.map((day) => (
                  <div className="home-study-box__time" key={day.daySeq}>
                    {day.startTime.slice(0, 5)} - {day.endTime.slice(0, 5)}
                  </div>
                ))}
              </div>
              <div className="home-study-box__desc">
                {study.shortDescription}
              </div>
              <div className="home-study-box__footer">
                <div className="home-study-box__img-wrapper">
                  {study.hostImage ? (
                    <img
                      src={`https://i6a301.p.ssafy.io:8080/images/${study.hostImage}`}
                      alt=""
                    />
                  ) : (
                    <svg
                      width="20"
                      height="20"
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
                  )}
                </div>
                <div className="home-study-box__host">{study.hostName}</div>
                <div className="home-study-box__members">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 7.5C8.44483 7.5 9.35097 7.12467 10.0191 6.45657C10.6872 5.78847 11.0625 4.88233 11.0625 3.9375C11.0625 2.99267 10.6872 2.08653 10.0191 1.41843C9.35097 0.750334 8.44483 0.375 7.5 0.375C6.55517 0.375 5.64903 0.750334 4.98093 1.41843C4.31283 2.08653 3.9375 2.99267 3.9375 3.9375C3.9375 4.88233 4.31283 5.78847 4.98093 6.45657C5.64903 7.12467 6.55517 7.5 7.5 7.5V7.5ZM9.875 3.9375C9.875 4.56739 9.62478 5.17148 9.17938 5.61688C8.73398 6.06228 8.12989 6.3125 7.5 6.3125C6.87011 6.3125 6.26602 6.06228 5.82062 5.61688C5.37522 5.17148 5.125 4.56739 5.125 3.9375C5.125 3.30761 5.37522 2.70352 5.82062 2.25812C6.26602 1.81272 6.87011 1.5625 7.5 1.5625C8.12989 1.5625 8.73398 1.81272 9.17938 2.25812C9.62478 2.70352 9.875 3.30761 9.875 3.9375V3.9375ZM14.625 13.4375C14.625 14.625 13.4375 14.625 13.4375 14.625H1.5625C1.5625 14.625 0.375 14.625 0.375 13.4375C0.375 12.25 1.5625 8.6875 7.5 8.6875C13.4375 8.6875 14.625 12.25 14.625 13.4375ZM13.4375 13.4328C13.4363 13.1406 13.2546 12.2619 12.4495 11.4567C11.6753 10.6825 10.2182 9.875 7.5 9.875C4.78063 9.875 3.32475 10.6825 2.5505 11.4567C1.74538 12.2619 1.56488 13.1406 1.5625 13.4328H13.4375Z"
                      fill="var(--textColor-todo)"
                    />
                  </svg>
                  <span>{study.memberList.length}/6</span>
                </div>
              </div>
            </div>
            <Modal open={modalStatus} close={closeModal}>
              <p>스터디룸에 입실하시겠습니까?</p>
              <Link
                to={{
                  pathname: `/studyroom`,
                }}
              >
                <button className="studyroom-in__btn">예</button>
              </Link>
              <button className="studyroom-in__no-btn" onClick={closeModal}>
                아니오
              </button>
            </Modal>
          </div>
        ))}
    </div>
  );
}
