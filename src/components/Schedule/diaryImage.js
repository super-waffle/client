import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function DiaryImage({ wantEdit, imgURL, setImgFile, preview, setPreview }) {
  const selectPicture = (e) => {
    setPreview(() => window.URL.createObjectURL(e.target.files[0]));
    setImgFile(() => e.target.files[0]);
  };
  return (
    <>
      {wantEdit ? <input type="file" id="file" accept="image/*" onChange={selectPicture} /> : null}
      <div className="diary-box__img-file-wrapper">
        {!preview && !imgURL ? (
          <div>
            <img src={'images/photoCat.png'} alt="defaultImg" />
            <p>사진을 남겨주세요</p>
          </div>
        ) : null}
        {!preview && imgURL ? (
          <img src={process.env.REACT_APP_SERVER_URL + `/images/${imgURL}`} alt="diaryImg" />
        ) : null}
        {preview ? <img src={preview} alt="preview" /> : null}
      </div>
    </>
  );
}
export default React.memo(DiaryImage);
