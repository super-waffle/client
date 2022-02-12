import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Modal from "../components/modal";
import "../statics/css/settingsAlarm.css";

export default function SettingsAlarm() {
  const TOKEN = localStorage.getItem("accessToken");
  const [notice, setNotice] = useState("");
  const [noticeCategories, setNoticeCategories] = useState("");
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/notices?page=1&size=10", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          const noticeData = res.data.noticeList;
          setNotice((prevState) => ({
            ...prevState,
            noticeData,
          }));
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/categories/report", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          const categories = res.data.list;
          setNoticeCategories((prevState) => ({
            ...prevState,
            categories,
          }));
        }
      });
  }, []);

  const categorySeqToName = useCallback((num) => {
    if (num === 101) {
      return "경고";
    }
    if (num === 102) {
      return "스터디 알림";
    }
    if (num === 103) {
      return "자유열람실 알림";
    }
  }, []);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달로 띄워주는 알림창 내용
  const [noticeSeq, setNoticeSeq] = useState("");
  const [noticeModal, setNoticeModal] = useState("");
  const [noticeModalTime, setNoticeModalTime] = useState("");
  const [noticeModalCategory, setNoticeModalCategory] = useState("");
  const [noticeModalCategorySeq, setNoticeModalCategorySeq] = useState("");
  const [noticeIsChecked, setNoticeIsChecked] = useState(false);
  const modalNoticeContent = useCallback((seq) => {
    for (let i = 0; i < notice.noticeData.length; i++) {
      let short = notice.noticeData[i];
      if (short.noticeSeq === seq) {
        setNoticeModal(short.noticeContent);
        setNoticeModalTime(short.noticeDate);
        setNoticeModalCategorySeq(short.categorySeq);
        setNoticeModalCategory(categorySeqToName(short.categorySeq));
        setNoticeIsChecked(short.isChecked);
        return;
      }
    }
  });

  // 알림 읽음
  const onClickIsChecked = useCallback(() => {
    axios
      .post(
        "/notices/" + noticeSeq,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => {
        window.location.reload();
      });
  });

  return (
    <div className="settings-notice">
      <div className="settings-notice-heading">알림 보관함</div>
      <div>
        <table>
          <tbody>
            {notice.noticeData &&
              notice.noticeData.map((alarm) => (
                <tr
                  key={alarm.noticeSeq}
                  className={`"settings-notice-board-row" + ${
                    alarm.isChecked ? "is-checked" : "not-checked"
                  }`}
                >
                  <td
                    className={`settings-notice-board-category + ${
                      alarm.categorySeq === 101 ? "alert" : "normal"
                    }`}
                  >
                    {categorySeqToName(alarm.categorySeq)}
                  </td>
                  <td
                    className="settings-notice-board-content"
                    onClick={() => {
                      openModal();
                      setNoticeSeq(alarm.noticeSeq);
                      modalNoticeContent(alarm.noticeSeq);
                    }}
                  >
                    {alarm.noticeContent}
                  </td>
                  <td className="settings-notice-board-is-checked">
                    {alarm.isChecked ? (
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5 12.7498H1.5C1.16848 12.7498 0.850537 12.6181 0.616116 12.3837C0.381696 12.1493 0.25 11.8314 0.25 11.4998V4.65547C0.26039 4.44887 0.321112 4.24794 0.426882 4.07017C0.532652 3.8924 0.680265 3.74317 0.856875 3.63547L5.85687 0.635469C6.05107 0.519026 6.27325 0.45752 6.49969 0.45752C6.72612 0.45752 6.9483 0.519026 7.1425 0.635469L12.1425 3.63547C12.5181 3.86234 12.7487 4.26859 12.75 4.70734V11.4998C12.75 11.8314 12.6183 12.1493 12.3839 12.3837C12.1495 12.6181 11.8315 12.7498 11.5 12.7498ZM1.5 5.16734V11.4998H11.5V5.16734L6.5 8.50047L1.5 5.16734ZM6.5 1.70734L2.3225 4.21359L6.5 6.99859L10.6769 4.21359L6.5 1.70734Z"
                          fill="#9C9C9C"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="13"
                        height="10"
                        viewBox="0 0 13 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.25 10H1.25C0.918479 10 0.600537 9.8683 0.366116 9.63388C0.131696 9.39946 0 9.08152 0 8.75V1.19563C0.0140204 0.873619 0.151881 0.569474 0.384799 0.346688C0.617717 0.123902 0.927689 -0.000304524 1.25 5.607e-07H11.25C11.5815 5.607e-07 11.8995 0.131697 12.1339 0.366117C12.3683 0.600537 12.5 0.91848 12.5 1.25V8.75C12.5 9.08152 12.3683 9.39946 12.1339 9.63388C11.8995 9.8683 11.5815 10 11.25 10ZM1.25 2.4175V8.75H11.25V2.4175L6.25 5.75L1.25 2.4175ZM1.75 1.25L6.25 4.25L10.75 1.25H1.75Z"
                          fill="var(--textColor)"
                        />
                      </svg>
                    )}
                  </td>
                  <td className="settings-notice-board-date">
                    {alarm.noticeDate}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal open={modalOpen} close={closeModal} header="">
        <div className="modal-notice-heading">
          <div
            className={`modal-notice-category ${
              noticeModalCategorySeq === 101 ? "alert" : ""
            }`}
          >
            [{noticeModalCategory}]
          </div>
          <div className="modal-notice-time">{noticeModalTime}</div>
        </div>
        <div className="modal-notice-msg">{noticeModal}</div>
        {!noticeIsChecked && (
          <button
            className="modal-notice-btn"
            onClick={() => {
              onClickIsChecked();
              closeModal();
            }}
          >
            확인
          </button>
        )}
      </Modal>
    </div>
  );
}
