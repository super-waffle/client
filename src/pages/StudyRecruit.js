import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategorySelect from "../components/categorySelect";
import "../statics/css/studyRecruit.css";
import isLogin from "../utils/isLogin";

export default function StudyRecruit() {
  const navigate = useNavigate();
  const TOKEN = localStorage.getItem("accessToken");
  const [category, setCategory] = useState("");
  const [postData, setPostData] = useState([]);
  // console.log(postData);
  useEffect(() => {
    if (isLogin) {
      axios
        .get("/studies?page=1&type=0&key=", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          // console.log(res);
          const data = res.data.data;
          setPostData((prevState) => ({
            ...prevState,
            data,
          }));
        });
    }
  }, []);
  return (
    <div className="studyrecruit">
      <div className="studyrecruit-heading">
        <span className="studyrecruit-h1">스터디 모집</span>
        <span className="studyrecruit-h2">
          모집 게시판에서 원하는 스터디를 찾아보세요
        </span>
      </div>
      <div className="studyrecuit-middle">
        <div className="studyrecruit-search">
          <CategorySelect categoryseq={setCategory} />
          <input placeholder="방제목, 글 내용으로 검색하세요" />
        </div>
        <button
          className="studyrecruit-create"
          onClick={() => navigate("create")}
        >
          모집글 작성하기
        </button>
      </div>
      <div className="studyrecruit-board">
        <table>
          <thead>
            <tr className="studyrecruit-board-th">
              <th className="studyrecruit-board-head num">#</th>
              <th className="studyrecruit-board-head title">제목</th>
              <th className="studyrecruit-board-head host">글쓴이</th>
              <th className="studyrecruit-board-head date">모집기한</th>
              <th className="studyrecruit-board-head ppl">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 7.5C8.44483 7.5 9.35097 7.12467 10.0191 6.45657C10.6872 5.78847 11.0625 4.88233 11.0625 3.9375C11.0625 2.99267 10.6872 2.08653 10.0191 1.41843C9.35097 0.750334 8.44483 0.375 7.5 0.375C6.55517 0.375 5.64903 0.750334 4.98093 1.41843C4.31283 2.08653 3.9375 2.99267 3.9375 3.9375C3.9375 4.88233 4.31283 5.78847 4.98093 6.45657C5.64903 7.12467 6.55517 7.5 7.5 7.5V7.5ZM9.875 3.9375C9.875 4.56739 9.62478 5.17148 9.17938 5.61688C8.73398 6.06228 8.12989 6.3125 7.5 6.3125C6.87011 6.3125 6.26602 6.06228 5.82062 5.61688C5.37522 5.17148 5.125 4.56739 5.125 3.9375C5.125 3.30761 5.37522 2.70352 5.82062 2.25812C6.26602 1.81272 6.87011 1.5625 7.5 1.5625C8.12989 1.5625 8.73398 1.81272 9.17938 2.25812C9.62478 2.70352 9.875 3.30761 9.875 3.9375V3.9375ZM14.625 13.4375C14.625 14.625 13.4375 14.625 13.4375 14.625H1.5625C1.5625 14.625 0.375 14.625 0.375 13.4375C0.375 12.25 1.5625 8.6875 7.5 8.6875C13.4375 8.6875 14.625 12.25 14.625 13.4375ZM13.4375 13.4328C13.4363 13.1406 13.2546 12.2619 12.4495 11.4567C11.6753 10.6825 10.2182 9.875 7.5 9.875C4.78063 9.875 3.32475 10.6825 2.5505 11.4567C1.74538 12.2619 1.56488 13.1406 1.5625 13.4328H13.4375Z"
                    fill="var(--board-textColor)"
                  />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {postData.data &&
              postData.data.map((post) => (
                <tr className="studyrecruit-board-body-tr">
                  <td className="studyrecruit-board-body number">
                    {post.studySeq}
                  </td>
                  <td className="studyrecruit-board-body">
                    <div>
                      <span className="studyrecruit-board-body__category">
                        {post.categoryName}
                      </span>
                      <span className="studyrecruit-board-body__title">
                        {post.studyTitle}
                      </span>
                    </div>

                    <div className="studyrecruit-board-body__shortdesc">
                      {post.studyShortDesc}
                    </div>
                  </td>
                  <td className="studyrecruit-board-body host">
                    {post.hostNickname}
                  </td>
                  <td className="studyrecruit-board-body enddate">
                    {post.studyRecruitEnd}
                  </td>
                  <td className="studyrecruit-board-body headcount">
                    {post.studyHeadcount}/6
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
