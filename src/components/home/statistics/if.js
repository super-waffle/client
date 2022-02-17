import axios from "axios";
import { useEffect, useState } from "react";
import "../../../statics/css/home/if.css";

export default function IfIWere() {
  const [timeTotal, setTimeTotal] = useState("");
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/users", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setTimeTotal(res.data.user.userTimeTotal);
        }
      });
  }, []);

  return (
    <div className="if">
      {/* {timeTotal && ( */}
      <div>
        <div className="if-header">
          <div className="if-header__header">누적 공부시간</div>
          <div className="if-header__body">
            {parseInt(timeTotal / 60)}시간{" "}
            {timeTotal - parseInt(timeTotal / 60) * 60}분
          </div>
        </div>
        <div className="if-body">
          <div className="if-body__box">
            <div className="if-body__box-header">3분카레</div>
            {timeTotal ? (
              <div className="if-body__box-body">
                {parseInt(timeTotal / 3).toLocaleString("ko-KR")}개 제조
              </div>
            ) : (
              <div className="if-body__box-body">0개 제조</div>
            )}
          </div>
          <div className="if-body__box">
            <div className="if-body__box-header">서울에서 뉴욕까지</div>
            <div className="if-body__box-body">
              {(timeTotal / 1680).toFixed(1)}회 왕복
            </div>
          </div>
          <div className="if-body__box">
            <div className="if-body__box-header">1분 영어단어</div>
            {timeTotal ? (
              <div className="if-body__box-body">
                {timeTotal.toLocaleString("ko-KR")}개 암기
              </div>
            ) : (
              <div className="if-body__box-body">0개 암기</div>
            )}
          </div>
          <div className="if-body__box">
            <div className="if-body__box-header">책읽기</div>
            <div className="if-body__box-body">
              {parseInt(timeTotal / 150)}권
            </div>
          </div>
          <div className="if-body__box">
            <div className="if-body__box-header">걸어서</div>
            {timeTotal ? (
              <div className="if-body__box-body">
                {(parseInt(timeTotal / 60) * 235).toLocaleString("ko-KR")}kcal
                소모
              </div>
            ) : (
              <div className="if-body__box-body">0kcal 소모</div>
            )}
          </div>
          <div className="if-body__box">
            <div className="if-body__box-header">노래방에서</div>
            <div className="if-body__box-body">
              {parseInt(timeTotal / 3.75).toLocaleString("ko-KR")}곡 부르기
            </div>
          </div>
          <div className="if-body__box">
            <div className="if-body__box-header">영화 관람</div>
            <div className="if-body__box-body">
              {(timeTotal / 127).toFixed(1)}편
            </div>
          </div>
          <div className="if-body__box">
            <div className="if-body__box-header">연애할 수 있는 횟수</div>
            <div className="if-body__box-body">0회</div>
          </div>
        </div>
      </div>
      {/* )} */}
      {/* {!timeTotal && (<div></div>)} */}
    </div>
  );
}
