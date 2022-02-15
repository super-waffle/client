import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../statics/css/diary.css';
import { useSelector } from 'react-redux';
import { set } from 'date-fns/esm';

// 1. 이미지 선택 안했을 때 분기처리
// 2. 수정 시 텍스트 에러 기존 데이터 안들어감 => done
// 3. 수정 화면에서 날짜변경 시 텍스트 변경 안됨 => donne
// ---------------
// [TODO]: 4. 미리보기 화면

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

  //이미지 업로드 및 미리보기를 위한 consts
  const [preview, setPreview] = useState('');
  // const [fileImage, setFileImage] = useState('');
  const [diaryImage, setDiaryImg] = useState('');
  const [diaryImgURL, setDiaryImgURL] = useState('');
  // const diaryImgURL =
  //   "https://i6a301.p.ssafy.io:8080/images/" + diaryData.diaryImg;
  const getCatImg = async () => {
    axios.get(URL).then((response) => setCatURL(response.data[0]['url']));
  };
  const getMaxim = async () => {
    axios
      .get('https://api.adviceslip.com/advice')
      .then((response) => setMaxim(response.data['slip']['advice']));
  };
  async function getDiaryData() {
    try {
      const response = await axios
        .get(
          process.env.REACT_APP_SERVER_URL +
            '/diaries?date=' +
            JSON.parse(selectedDay),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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
  }, [selectedDay]);
  useEffect(() => {
    if (diaryData) {
      setDiaryImgURL(
        () => `https://i6a301.p.ssafy.io:8080/images/${diaryData.diaryImg}`
      );
    }
  }, [diaryData, selectedDay]);
  const previewImgEncoder = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPreview(() => reader.result);
        resolve();
      };
    });
  };
  const saveFileImage = (e) => {
    if (toEdit) {
      setDiaryImg(() => e.target.files[0]);
    }
    setPreview(() => previewImgEncoder(e.target.files[0]));
  };

  let data = new FormData();
  // 삼항연산자로 null값처리
  if (diaryImage) {
    data.append('image', diaryImage);
  } else {
    data.append('image', null);
  }
  data.append('dateInfo.date', JSON.parse(selectedDay));
  data.append('contentInfo.content', todayDiary);

  let updateData = new FormData();
  updateData.append('image', diaryImage);
  const createDiary = () => {
    axios
      .post(process.env.REACT_APP_SERVER_URL + '/diaries', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(data);
        setToEdit(() => false);
        setPreview(() => null);
      });
  };

  const updateDiary = () => {
    axios
      .patch(
        process.env.REACT_APP_SERVER_URL + `/diaries/${diaryData.diarySeq}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setToEdit(() => false);
        setPreview(() => null);
      });
  };

  const changeDay = () => {
    setToEdit(() => false);
    setPreview(() => null);
  };
  useEffect(() => changeDay(), [selectedDay]);
  // console.log(toEdit);
  // console.log(diaryData);
  console.log(data);
  return (
    <div className="diary">
      <div className="diary-header">하루 기록</div>
      <Row className="diary-box">
        {diaryData && diaryData.diaryImg ? (
          // (조회)다이어리 데이터가 있는 경우의 이미지 출력
          <Col className="diary-box__img" sm={4} md={4} lg={4}>
            {!toEdit ? (
              <div className="diary-box__img-file-wrapper ">
                <img src={diaryImgURL} alt="" />
              </div>
            ) : (
              <>
                <div className="diary-box__img-file-wrapper ">
                  {preview ? (
                    <img src={preview} alt="" />
                  ) : (
                    <img src={diaryImgURL} alt="" />
                  )}
                </div>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={saveFileImage}
                />
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
                  <img src={catURL} alt="" />
                </div>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={saveFileImage}
                />
              </>
            )}
          </Col>
        )}

        {diaryData ? (
          <Col className="diary-box__contents">
            {!toEdit ? (
              <>
                <div className="diary-box__contents-text">
                  {diaryData.diaryContent}
                </div>
                <button
                  className="diary-box__contents-btn"
                  onClick={() => setToEdit(true)}
                >
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
                <button
                  className="diary-box__contents-btn"
                  onClick={updateDiary}
                >
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
                <button
                  className="diary-box__contents-btn"
                  onClick={() => setToEdit(true)}
                >
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
                <button
                  className="diary-box__contents-btn"
                  onClick={createDiary}
                >
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
