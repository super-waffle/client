import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../statics/css/diary.css";
import { useSelector } from "react-redux";

export default function Diary() {
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
  const getCatImg = async () => {
    axios.get(URL).then((response) => setCatURL(response.data[0]["url"]));
  };
  const getMaxim = async () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => setMaxim(response.data["slip"]["advice"]));
  };

  const getDiaryData = async () => {
    axios
      .get("/diaries?date=" + JSON.parse(selectedDay), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          const data = res.data.diary;
          setDiaryData(() => data);
        }
      });
  };
  const saveFileImage = (e) => {
    // setFileImage(URL.createObjectURL(e.target.files[0]));
    setDiaryImg(e.target.files[0]);
    console.log(fileImage);
  };

  let data = new FormData();
  data.append("image", diaryImage);
  data.append("diaryInfo.date", JSON.parse(today));
  data.append("diaryInfo.content", todayDiary);

  const writeDiary = () => {
    axios
      .post("/diaries", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };

  useEffect(() => {
    getMaxim();
    getCatImg();
    getDiaryData();
  }, []);
  console.log(diaryData);
  return (
    <div className="diary">
      <div className="diary-header">하루 기록</div>
      <Row className="diary-box">
        <Col className="diary-box__img" sm={4} md={4} lg={4}>
          <img src={catURL} alt="" />
          {toEdit && (
            <div className="diary-box__edit-img">
              {diaryData ? (
                <img src={diaryData.image} />
              ) : (
                <img src={catURL} alt="" />
              )}

              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={saveFileImage}
                // onClick={() => setIsActive(!isActive)}
              />
            </div>
          )}
        </Col>
        <Col
          className="diary-box__contents"
          // style={{
          //   fontFamily: "pretendard",
          //   margin: "auto 0rem",
          //   textAlign: "center",
          // }}
        >
          {/* <h4>{maxim}</h4> */}
          {/* <h4>과유불급이댜옹~</h4> */}
          {toEdit &&
            (diaryData ? (
              <div>
                <textarea
                  type="text"
                  maxLength="1000"
                  defaultValue={diaryData}
                  onChange={(e) => setTodayDiary(e.target.value)}
                ></textarea>
                <button className="diary-box__contents-btn">확인</button>
              </div>
            ) : (
              <div>
                <textarea
                  type="text"
                  maxLength="1000"
                  defaultValue={maxim}
                  onChange={(e) => setTodayDiary(e.target.value)}
                ></textarea>
                <button
                  className="diary-box__contents-btn"
                  onClick={writeDiary}
                >
                  확인
                </button>
              </div>
            ))}
          {!toEdit && (
            <button
              className="diary-box__contents-btn"
              onClick={() => setToEdit(true)}
            >
              수정
            </button>
          )}
        </Col>
      </Row>
    </div>
  );
}
