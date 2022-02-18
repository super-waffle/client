import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// 삭제 버튼
function DiaryText({
  wantEdit,
  setWantEdit,
  content,
  setContent,
  createDiary,
  updateDiary,
  diarySeq,
}) {
  const token = localStorage.getItem("accessToken");

  const onEdit = () => {
    setWantEdit(() => true);
  };
  const offEdit = () => {
    if (diarySeq) {
      updateDiary();
    } else {
      createDiary();
    }
    setWantEdit(() => false);
  };
  return (
    <>
      {wantEdit ? (
        <div className="diary-box__contents-text">
          <textarea
            type="text"
            maxLength="1000"
            defaultValue={content}
            onChange={(e) => setContent(() => e.target.value)}
          />
          <div className="diary-box__text-btn">
            <button className="diary-box__contents-btn" onClick={offEdit}>
              저장
            </button>
          </div>
        </div>
      ) : (
        <div className="diary-box__contents-text">
          <div>{content}</div>
          <div className="diary-box__text-btn">
            <button className="diary-box__contents-btn" onClick={onEdit}>
              수정
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default React.memo(DiaryText);
