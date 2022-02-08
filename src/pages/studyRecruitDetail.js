import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isLogin from "../utils/isLogin";
import "../statics/css/studyRecruitDetail.css";

export default function StudyRecruitDetail() {
  const TOKEN = localStorage.getItem("accessToken");
  const [data, setData] = useState([]);

  const { studyseq } = useParams();
  console.log(studyseq);

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
          <div className="studyrecruit-detail-box-heading__title"></div>
          <div className="studyrecruit-detail-box-heading__category"></div>
        </div>
        <div className="studyrecruit-detail-box-heading__second">
          <div className="studyrecruit-detail-box-heading__profileImage"></div>
          <div className="studyrecruit-detail-box-heading__nickname"></div>
        </div>
        <hr></hr>
        <div className="studyrecruit-detail-box-body">
          <div className="studyrecruit-detail-box-body__time"></div>
          <div className="studyrecruit-detail-box-body__enddate"></div>
          <div className="studyrecruit-detail-box-body__shortdesc"></div>
          <div className="studyrecruit-detail-box-body__desc"></div>
        </div>
        <div className="studyrecruit-detail-box-footer">
          <button>스터디 신청</button>
        </div>
      </div>
    </div>
  );
}
