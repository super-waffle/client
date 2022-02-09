import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isLogin from "../utils/isLogin";
import "../statics/css/studyRecruitDetail.css";
import { post } from "jquery";

export default function StudyRecruitDetail() {
  const TOKEN = localStorage.getItem("accessToken");
  const [data, setData] = useState([]);
  const [studyDay, setStudyDay] = useState({
    dayNum: 0,
    startTime: "",
    endTime: "",
  });

  const { studyseq } = useParams();

  useEffect(() => {
    if (isLogin) {
      axios
        .get("/studies/" + studyseq, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          const apidata = res.data;
          setData((prevState) => ({
            ...prevState,
            apidata,
          }));
        });
    }
  }, []);
  console.log(data);
  return (
    <div className="studyrecruit-detail">
      <div className="studyrecruit-detail-box">
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
                <tr>
                  <td className="studyrecruit-detail-box-body__title">
                    스터디 일정
                  </td>
                  {data.apidata &&
                    data.apidata.day.map((days) => (
                      <>
                        <span className="studyrecruit-detail-box-body__day">
                          {days.dayNumber}
                        </span>
                        <span className="studyrecruit-detail-box-body__day">
                          {days.timeStart.slice(0, 5)} ~{" "}
                          {days.timeEnd.slice(0, 5)}
                        </span>
                      </>
                    ))}
                </tr>
              </tbody>
            </table>
          </div>
          <span className="studyrecruit-detail-box-body__title">모집 기간</span>
          {data.apidata && (
            <span className="studyrecruit-detail-box-body__enddate">
              ~ {data.apidata.studyRecruitEnd}
            </span>
          )}
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
        <div className="studyrecruit-detail-box-footer">
          <button>스터디 신청</button>
        </div>
      </div>
    </div>
  );
}
