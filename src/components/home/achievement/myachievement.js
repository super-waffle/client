import React from "react";
import CircularProgressBar from "./CircularProgressBar";
import "../../../statics/css/home/myAchievement.css";

export default function Myachievement({
  achieveName,
  achieveImg,
  achieveCount,
  achieveTotalCount,
}) {
  const percentage = ((achieveCount / achieveTotalCount) * 100).toFixed(0);

  const AchieveImg = "https://i6a301.p.ssafy.io:8080/images/" + achieveImg;

  // console.log(percentage,"퍼센트");
  return (
    <div className="my-achievement">
      {achieveImg ? (
        <div className="my-achievement__selected">
          <img
            src={AchieveImg}
            alt=""
            //   style={{ width: "100px", height: "100px" }}
          />
          <div className="my-achievement__selected-text">{achieveName}</div>
        </div>
      ) : (
        <div className="my-achievement__not-selected">
          선택된 업적이 없습니다
        </div>
      )}
      <div className="my-achievement__percentage">
        <div className="my-achievement__percentage__text">업적도감 달성률</div>
        <div className="my-achievement__percentage__graph">
          <CircularProgressBar percentage={percentage} />
        </div>
      </div>
    </div>
  );
}
