import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../statics/css/diary.css';
import { useSelector } from 'react-redux';

export default function Diary(props) {
  const URL = 'https://api.thecatapi.com/v1/images/search';
  const token = localStorage.getItem('accessToken');
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const today = useSelector((state) => state.schedule.today);
  const [catURL, setCatURL] = useState('');
  const [maxim, setMaxim] = useState('');
  const [toEdit, setToEdit] = useState(false);
  const [diaryData, setDiaryData] = useState('');
  const [todayDiary, setTodayDiary] = useState('');
  const [preview, setPreview] = useState(''); // 미리보기 이미지
  const [diaryImg, setDiaryImg] = useState(''); // 이미지 파일 이름
  //diaryData.diaryImg : 이미지 불러올때 사용

  let data = new FormData();
  if (diaryImg) {
    data.append('image', diaryImg);
  }
  data.append('dateInfo.date', JSON.parse(selectedDay));
  data.append('contentInfo.content', todayDiary ? todayDiary : null);

  let updateData = new FormData();
  if (preview) {
    updateData.append('image', diaryImg ? diaryImg : null);
  }
  updateData.append('contentInfo.content', todayDiary ? todayDiary : null);

  const getCatImg = async () => {
    axios.get(URL).then((response) => setCatURL(response.data[0]['url']));
  };
  const getMaxim = async () => {
    axios.get('https://api.adviceslip.com/advice').then((response) => setMaxim(response.data['slip']['advice']));
  };
  async function getDiaryData() {
    try {
      const response = await axios
        .get(process.env.REACT_APP_SERVER_URL + '/diaries?date=' + JSON.parse(selectedDay), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          let updatedDiary = response.data.diary;
          setTimeout(() => {
            setDiaryData(() => updatedDiary);
          }, 100);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMaxim();
    getCatImg();
  }, [selectedDay]);
  useEffect(() => {
    getDiaryData();
    if (preview) {
      window.URL.revokeObjectURL(preview);
    }
    setPreview(() => null);
  }, [selectedDay]);
  const saveFileImage = (e) => {
    setDiaryImg(() => e.target.files[0]);
    setPreview(() => window.URL.createObjectURL(e.target.files[0]));
  };

  const createDiary = () => {
    axios
      .post(process.env.REACT_APP_SERVER_URL + '/diaries', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setToEdit(() => false);
        window.URL.revokeObjectURL(preview);
      });
  };

  const updateDiary = () => {
    axios
      .patch(process.env.REACT_APP_SERVER_URL + `/diaries/${diaryData.diarySeq}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setToEdit(() => false);
        window.URL.revokeObjectURL(preview);
      });
  };
  //// 날짜 변경시 바꿔줘야 할 것들
  const changeDay = () => {
    setToEdit(() => false);
    setPreview(() => null);
  };
  useEffect(() => changeDay(), [selectedDay]);
  console.log(preview);
  return (
    <div className="diary">
      <div className="diary-header">하루 기록</div>
      <Row className="diary-box">
        {diaryData && diaryData.diaryImg ? (
          // (조회)다이어리 데이터가 있는 경우의 이미지 출력
          <Col className="diary-box__img" sm={4} md={4} lg={4}>
            {!toEdit ? (
              <div className="diary-box__img-file-wrapper ">
                <img src={process.env.REACT_APP_SERVER_URL + `/images/${diaryData.diaryImg}`} alt="" />
              </div>
            ) : (
              <>
                <div className="diary-box__img-file-wrapper ">
                  {preview && !diaryImg ? (
                    <img src={preview} alt="" />
                  ) : (
                    <img src={process.env.REACT_APP_SERVER_URL + `/images/${diaryData.diaryImg}`} alt="" />
                  )}
                </div>
                <input type="file" id="file" accept="image/*" onChange={saveFileImage} />
              </>
            )}
          </Col>
        ) : (
          // (조회) 다이어리 데이터가 없는 경우 고양이 이미지 출력
          <Col className="diary-box__img" sm={4} md={4} lg={4}>
            {!toEdit ? (
              <div className="diary-box__img-file-wrapper ">
                <img src={catURL} alt="" />
              </div>
            ) : (
              <>
                <div className="diary-box__img-file-wrapper ">
                  {preview ? <img src={preview} alt="" /> : null}
                  {!preview ? <img src={catURL} alt="" /> : null}
                </div>
                <input type="file" id="file" accept="image/*" onChange={saveFileImage} />
              </>
            )}
          </Col>
        )}

        {diaryData ? (
          <Col className="diary-box__contents">
            {!toEdit ? (
              <>
                <div className="diary-box__contents-text">{diaryData.diaryContent}</div>
                <button className="diary-box__contents-btn" onClick={() => setToEdit(true)}>
                  수정
                </button>
              </>
            ) : (
              <>
                <textarea
                  type="text"
                  maxLength="1000"
                  defaultValue={diaryData.diaryContent}
                  onChange={(e) => setTodayDiary(e.target.value)}
                />
                <button className="diary-box__contents-btn" onClick={updateDiary}>
                  확인
                </button>
              </>
            )}
          </Col>
        ) : (
          <Col className="diary-box__contents">
            {!toEdit ? (
              <>
                <div className="diary-box__contents-text">{maxim}</div>
                <button className="diary-box__contents-btn" onClick={() => setToEdit(true)}>
                  수정
                </button>
              </>
            ) : (
              <>
                <textarea
                  type="text"
                  maxLength="1000"
                  defaultValue={maxim}
                  onChange={(e) => setTodayDiary(e.target.value)}
                ></textarea>
                <button className="diary-box__contents-btn" onClick={createDiary}>
                  확인
                </button>
              </>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
}
