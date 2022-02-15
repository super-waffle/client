import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../statics/css/diary.css";
import { useSelector } from "react-redux";

export default function Diary(props) {
  const URL = "https://api.thecatapi.com/v1/images/search";
  const token = localStorage.getItem("accessToken");

  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const today = useSelector((state) => state.schedule.today);
  const [catURL, setCatURL] = useState("");
  const [maxim, setMaxim] = useState("");
  const [toEdit, setToEdit] = useState(false);
  const [diaryData, setDiaryData] = useState("");
  const [todayDiary, setTodayDiary] = useState("");

  //이미지 업로드 및 미리보기를 위한 consts
  const [fileImage, setFileImage] = useState("");
  const [diaryImage, setDiaryImg] = useState("");
  const [diaryImgURL, setDiaryImgURL] = useState("");
  // const diaryImgURL =
  //   "https://i6a301.p.ssafy.io:8080/images/" + diaryData.diaryImg;
  const getCatImg = async () => {
    axios.get(URL).then((response) => setCatURL(response.data[0]["url"]));
  };
  const getMaxim = async () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => setMaxim(response.data["slip"]["advice"]));
  };
  async function getDiaryData() {
    try {
      const response = await axios
        .get(
          process.env.REACT_APP_SERVER_URL +
            "/diaries?date=" +
            JSON.parse(selectedDay),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          let updatedDiary = response.data.diary;
          setDiaryData(() => []);
          setTimeout(() => {
            setDiaryData(() => updatedDiary);
          }, 100);
        });
      // let updatedDiary = await response.data.diary;
      // setDiaryData(() => []);
      // setTimeout(() => {
      //   setDiaryData(() => updatedDiary);
      // }, 100);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(diaryData);
  useEffect(() => {
    getMaxim();
    getCatImg();
  }, []);
  useEffect(() => {
    getDiaryData();
  }, [selectedDay]);
  useEffect(() => {
    if (diaryData) {
      setDiaryImgURL(
        () => `https://i6a301.p.ssafy.io:8080/images/${diaryData.diaryImg}`
      );
    }
  }, [diaryData]);

  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    setDiaryImg(e.target.files[0]);
  };
  // console.log(fileImage);
  // console.log(diaryImage);

  let data = new FormData();
  data.append("image", diaryImage);
  data.append("dateInfo.date", JSON.parse(today));
  data.append("contentInfo.content", todayDiary);

  const createDiary = () => {
    axios
      .post("/diaries", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // window.location.reload();
      });
  };

  const updateDiary = () => {
    axios
      .patch("/diaries/" + diaryData.diarySeq, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
  // console.log(toEdit);

  // console.log(diaryData);
  return (
    <div className="diary">
      <div className="diary-header">하루 기록</div>
      <Row className="diary-box">
        {/* <Col className="diary-box__img" sm={4} md={4} lg={4}> */}
        {/* <div className="diary-box__img-file-wrapper ">
            {diaryImage && !fileImage && (
              <img
                className="settings-profile__box-img-file"
                src={diaryImgURL}
                alt=""
              />
            )}
            {diaryImage && fileImage && (
              <img
                className="settings-profile__box-img-file"
                src={fileImage}
                alt=""
              />
            )}
          </div> */}
        {/* </Col> */}

        {diaryData ? (
          // (조회)다이어리 데이터가 있는 경우의 이미지 출력
          <Col className="diary-box__img" sm={4} md={4} lg={4}>
            {!toEdit ? (
              <div className="diary-box__img-file-wrapper ">
                <img src={diaryImgURL} />
              </div>
            ) : (
              <>
                <div className="diary-box__img-file-wrapper ">
                  <img src={diaryImgURL} />
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
                ></textarea>
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
