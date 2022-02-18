import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function DiaryImage({ wantEdit, imgURL, setImgFile, preview, setPreview }) {
  const selectPicture = (e) => {
    setPreview(() => window.URL.createObjectURL(e.target.files[0]));
    setImgFile(() => e.target.files[0]);
  };
  return (
    <div className="diary-image">
      {wantEdit ? (
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={selectPicture}
        />
      ) : null}
      <div className="diary-box__img-file-wrapper">
        {!preview && !imgURL ? (
          <div>
            <img src={"images/photoCat.png"} alt="defaultImg" />
            {!wantEdit && (
              <div className="diary-image__text">
                오늘 하루를 기록할 사진을 남겨주세요
              </div>
            )}
          </div>
        ) : null}
        {!preview && imgURL ? (
          <img
            src={process.env.REACT_APP_SERVER_URL + `/images/${imgURL}`}
            alt="diaryImg"
          />
        ) : null}
        {preview ? <img src={preview} alt="preview" /> : null}
      </div>
    </div>
  );
}
export default React.memo(DiaryImage);
