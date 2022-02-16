import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../statics/css/diary.css';
import { useSelector } from 'react-redux';
import DiaryImage from './diaryImage';
import DiaryText from './diaryText';

function DiaryRefac() {
  const token = localStorage.getItem('accessToken');
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const [wantEdit, setWantEdit] = useState(false); // 수정여부
  const [data, setData] = useState(new FormData()); // 전송할 데이터
  const [imgFile, setImgFile] = useState(''); // 이미지 파일
  const [content, setContent] = useState(''); // 글 내용
  const [imgURL, setImgURL] = useState(''); // 서버에서 불러올 img url
  const [preview, setPreview] = useState('');
  const [diarySeq, setDiarySeq] = useState('');
  const getData = async () => {
    await axios
      .get(process.env.REACT_APP_SERVER_URL + '/diaries?date=' + JSON.parse(selectedDay), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.diary);
        setData(() => response.data.diary);
      });
  };
  useEffect(() => {
    if (data) {
      setImgURL(() => data.diaryImg);
      setContent(() => data.diaryContent);
      setDiarySeq(() => data.diarySeq);
    }
  }, [data]);
  const createDiary = async () => {
    let createData = new FormData();
    if (imgFile) {
      createData.append('image', imgFile);
    }
    createData.append('dateInfo.date', JSON.parse(selectedDay));
    createData.append('contentInfo.content', content);
    axios
      .post(process.env.REACT_APP_SERVER_URL + '/diaries?date=' + JSON.parse(selectedDay), createData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => getData())
      .catch((err) => console.log(err));
  };
  const updateDiary = async () => {
    let updateData = new FormData();
    if (imgFile) {
      updateData.append('image', imgFile);
    }
    updateData.append('contentInfo.content', content);
    axios
      .patch(process.env.REACT_APP_SERVER_URL + `/diaries/${diarySeq}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => getData())
      .catch((err) => console.log(err));
  };
  const changeDay = () => {
    setPreview(() => '');
    setImgURL(() => '');
    setContent(() => '');
    setDiarySeq(() => '');
    setWantEdit(() => false);
    setImgFile(() => null);
  };
  useEffect(() => {
    getData();
    changeDay();
  }, [selectedDay]);
  return (
    <div className="diary">
      <div className="diary-header">하루 기록</div>
      <Row className="diary-box">
        <Col className="diary-box__contents" sm={4} md={4} lg={4}>
          <DiaryImage
            wantEdit={wantEdit}
            imgURL={imgURL}
            setImgFile={setImgFile}
            preview={preview}
            setPreview={setPreview}
          />
        </Col>
        <Col className="diary-box__img" sm={4} md={4} lg={4}>
          <DiaryText
            wantEdit={wantEdit}
            setWantEdit={setWantEdit}
            content={content}
            setContent={setContent}
            createDiary={createDiary}
            updateDiary={updateDiary}
            setPreview={setPreview}
            diarySeq={diarySeq}
          />
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(DiaryRefac);
