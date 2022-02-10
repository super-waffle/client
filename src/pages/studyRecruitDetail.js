import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import isLogin from "../utils/isLogin";
import "../statics/css/studyRecruitDetail.css";
import Modal from "../components/modal";

export default function StudyRecruitDetail() {
  const TOKEN = localStorage.getItem("accessToken");
  const { studyseq } = useParams();
  const [data, setData] = useState([]);
  const [todayDate, setTodayDate] = useState(new Date());
  const [isSuccess, setIsSuccess] = useState(false);
  const [userSeq, setUserSeq] = useState("");

  // 모달창
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // yyyy-mm-dd
  function changeDateFormat() {
    if (setTodayDate === null) {
      console.log("no date");
    }
    return (
      todayDate.getFullYear() +
      "-" +
      (todayDate.getMonth() + 1 > 9
        ? (todayDate.getMonth() + 1).toString()
        : "0" + (todayDate.getMonth() + 1)) +
      "-" +
      (todayDate.getDate() > 9
        ? todayDate.getDate().toString()
        : "0" + todayDate.getDate().toString())
    );
  }

  // 데이터 받아오기
  useEffect(() => {
    if (isLogin) {
      axios
        .get("/users", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          setUserSeq(res.data.user.userSeq);
        });
      axios
        .get("/studies/" + studyseq, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          const apidata = res.data;
          setData((prevState) => ({
            ...prevState,
            apidata,
          }));
        });
    }
  }, [TOKEN, studyseq]);

  // 요일 숫자를 이름으로 바꿔주기
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
  console.log(data);

  // 스터디 신청
  const onApply = useCallback(() => {
    axios
      .post(
        "/studies/" + studyseq + "/application",
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.statusCode === 200) {
          setIsSuccess(true);
        } else if (res.data.statusCode === 409) {
          setIsSuccess(false);
        }
        openModal();
      });
  }, [TOKEN, studyseq]);

  return (
    <div className="studyrecruit-detail">
      <div className="studyrecruit-detail-goback">
        <Link className="studyrecruit-detail-goback__link" to={"/studyrecruit"}>
          스터디 모집 게시판
        </Link>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.99462 1.74978C3.9292 1.81675 3.89258 1.90666 3.89258 2.00028C3.89258 2.0939 3.9292 2.18381 3.99462 2.25078L7.64937 6.00002L3.99462 9.74852C3.9292 9.81549 3.89258 9.9054 3.89258 9.99902C3.89258 10.0926 3.9292 10.1825 3.99462 10.2495C4.02641 10.2822 4.06443 10.3081 4.10643 10.3259C4.14842 10.3436 4.19354 10.3527 4.23912 10.3527C4.2847 10.3527 4.32982 10.3436 4.37181 10.3259C4.4138 10.3081 4.45182 10.2822 4.48362 10.2495L8.37012 6.26177C8.43838 6.19174 8.47658 6.09782 8.47658 6.00002C8.47658 5.90223 8.43838 5.8083 8.37012 5.73827L4.48362 1.75053C4.45182 1.71787 4.4138 1.69192 4.37181 1.67419C4.32982 1.65647 4.2847 1.64734 4.23912 1.64734C4.19354 1.64734 4.14842 1.65647 4.10643 1.67419C4.06443 1.69192 4.02641 1.71787 3.99462 1.75053V1.74978Z"
            fill="var(--textColor)"
          />
        </svg>
        {data.apidata && (
          <span className="studyrecruit-detail-goback__category">
            {data.apidata.categoryName}
          </span>
        )}
      </div>
      <div className="studyrecruit-detail-box">
        <div>
          <div className="studyrecruit-detail-box-heading__first">
            {data.apidata && (
              <div className="studyrecruit-detail-box-heading__title">
                {data.apidata.studyTitle}
              </div>
            )}
            {data.apidata && (
              <div className="studyrecruit-detail-box-heading__category">
                {data.apidata.categoryName}
              </div>
            )}
          </div>
          <div className="studyrecruit-detail-box-heading__second">
            <div className="studyrecruit-detail-box-heading__profileImage"></div>
            {data.apidata && (
              <div className="studyrecruit-detail-box-heading__nickname">
                {data.apidata.hostNickName}
              </div>
            )}
          </div>
          <hr></hr>
          <div className="studyrecruit-detail-box-body">
            <div className="studyrecruit-detail-box-body__time">
              <table>
                <tbody>
                  <tr className="studyrecruit-detail-box-body__row">
                    <td className="studyrecruit-detail-box-body__title">
                      스터디 일정
                    </td>
                    {data.apidata &&
                      data.apidata.day.map((days) => (
                        <td key={days.dayNumber}>
                          <div className="studyrecruit-detail-box-body__days">
                            <div className="studyrecruit-detail-box-body__day name">
                              {numberToDay(days.dayNumber)}
                            </div>
                            <div className="studyrecruit-detail-box-body__day timestart">
                              {days.timeStart.slice(0, 5)} ~{" "}
                            </div>
                            <div className="studyrecruit-detail-box-body__day timeend">
                              {days.timeEnd.slice(0, 5)}
                            </div>
                          </div>
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr className="studyrecruit-detail-box-body__row">
                    <td className="studyrecruit-detail-box-body__title">
                      모집 기간
                    </td>
                    {data.apidata && (
                      <td className="studyrecruit-detail-box-body__enddate">
                        {changeDateFormat()} ~ {data.apidata.studyRecruitEnd}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            {data.apidata && (
              <div className="studyrecruit-detail-box-body__shortdesc">
                {data.apidata.studyShortDesc}
              </div>
            )}
            {data.apidata && (
              <div className="studyrecruit-detail-box-body__desc">
                {data.apidata.studyDesc}
              </div>
            )}
          </div>
        </div>
        {/* [TODO]: userSeq hostSeq 비교해서 상세정보 페이지 차이 만들기 */}
        {/* {userSeq !== host} */}
        <center>
          <div className="studyrecruit-detail-box-footer">
            <button
              onClick={onApply}
              className="studyrecruit-detail-box-footer__btn"
            >
              스터디 신청
            </button>
            <Modal open={modalOpen} close={closeModal} header=" ">
              {isSuccess && (
                <div className="studyapply-modal-msg">
                  신청이 완료되었습니다
                </div>
              )}
              {!isSuccess && (
                <div className="studyapply-modal-msg">
                  이미 신청한 스터디입니다
                </div>
              )}
              <button className="studyapply-modal-ok" onClick={closeModal}>
                확인
              </button>
              <button className="studyapply-modal-go-to-mystudy">
                내 스터디 보러가기
              </button>
            </Modal>
          </div>
        </center>
      </div>
    </div>
  );
}
