import React, { Component } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import { MdMicOff } from "react-icons/md";
import Modal from "../../modal";
import axios from "axios";

const token = localStorage.getItem("accessToken");
export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.cumTime,
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: this.props.user.getIsMuted(),
      isFormValid: true,
      timeString: this.props.timeString,
      isHovering: false,
      modalOpen: false,
      Msg: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
    this.handlerMouseON = this.handlerMouseON.bind(this);
    this.handlerMouseOff = this.handlerMouseOff.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleExitUser = this.handleExitUser.bind(this);
  }

  handleExitUser() {
    return new Promise((resolve, reject) => {
      axios
        .post(
          process.env.REACT_APP_SERVER_URL +
            `/meetings/${this.props.meetingSeq}/kick/${this.props.user.getNickname()}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const STATUS = res.data.statusCode;
          resolve(res.data.statusCode);
          if (STATUS === 200) {
            this.setState({ Msg: "강퇴완료" });
          } else if (STATUS === 201) {
            this.setState({ Msg: "강퇴완료" });
          } else if (STATUS === 409) {
            this.setState({ Msg: "host가 아닙니다" });
          }
        })
        .catch((err) => {
          reject(err);
        });

      this.closeModal();
    });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  handlerMouseON() {
    this.setState({ isHovering: true });
  }

  handlerMouseOff() {
    this.setState({ isHovering: false });
  }

  handleChange(event) {
    this.setState({ nickname: event.target.value });
    event.preventDefault();
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm });
    }
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname);
        this.toggleNicknameForm();
        this.setState({ isFormValid: true });
      } else {
        this.setState({ isFormValid: false });
      }
    }
  }

  render() {
    return (
      <div className="OT_widget-container">
        {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
          <div
            className="streamComponent"
            onMouseEnter={this.handlerMouseON}
            onMouseLeave={this.handlerMouseOff}
          >
            <OvVideoComponent user={this.props.user} mutedSound={this.props.user.getIsMuted()} />
            {this.props.user.isVideoActive() || !this.props.user.getIsBlocked ? (
              <div className="video-username">{this.state.nickname}</div>
            ) : (
              <div className="video-camoff">{this.state.nickname}</div>
            )}
            <div className="video-time">{this.props.timeString}</div>

            {this.props.user.type === "remote" && this.props.isHost && (
              <div id="status-exiticons">
                {this.state.isHovering && (
                  <div id="exitIcon" onClick={this.openModal} style={{ cursor: "pointer" }}>
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="27" height="27" rx="13.5" fill="#CE5A65" />
                      <path
                        d="M14.3833 13.4998L19.5665 8.31664C19.6245 8.25861 19.6705 8.18971 19.7019 8.11389C19.7333 8.03807 19.7495 7.95681 19.7495 7.87474C19.7495 7.79267 19.7333 7.71141 19.7019 7.63559C19.6705 7.55977 19.6245 7.49088 19.5664 7.43285C19.5084 7.37482 19.4395 7.32879 19.3637 7.29739C19.2879 7.26598 19.2066 7.24982 19.1245 7.24982C19.0425 7.24982 18.9612 7.26599 18.8854 7.2974C18.8096 7.3288 18.7407 7.37484 18.6826 7.43287L13.4995 12.616L8.3164 7.43287C8.25849 7.3743 8.18957 7.32775 8.11361 7.29591C8.03764 7.26406 7.95614 7.24755 7.87377 7.24732C7.7914 7.24708 7.7098 7.26314 7.63366 7.29455C7.55752 7.32596 7.48834 7.37212 7.4301 7.43036C7.37186 7.48861 7.3257 7.55779 7.29429 7.63393C7.26288 7.71008 7.24684 7.79168 7.24707 7.87404C7.24731 7.95641 7.26383 8.03792 7.29567 8.11388C7.32752 8.18984 7.37407 8.25876 7.43265 8.31666L12.6158 13.4998L7.43265 18.6829C7.37462 18.7409 7.32858 18.8098 7.29718 18.8857C7.26577 18.9615 7.24961 19.0427 7.24961 19.1248C7.24961 19.2069 7.26577 19.2881 7.29718 19.364C7.32858 19.4398 7.37461 19.5087 7.43264 19.5667C7.49067 19.6247 7.55957 19.6708 7.63539 19.7022C7.71121 19.7336 7.79247 19.7497 7.87454 19.7497C7.95661 19.7497 8.03787 19.7336 8.11369 19.7022C8.18951 19.6708 8.2584 19.6247 8.31643 19.5667L13.4996 14.3836L18.6827 19.5667C18.7999 19.6839 18.9588 19.7497 19.1246 19.7497C19.2903 19.7497 19.4493 19.6839 19.5665 19.5667C19.6837 19.4495 19.7495 19.2906 19.7495 19.1248C19.7495 18.9591 19.6837 18.8001 19.5665 18.6829L14.3833 13.4998Z"
                        fill="white"
                        fill-opacity="0.95"
                      />
                    </svg>
                  </div>
                )}

                <Modal open={this.state.modalOpen} close={this.closeModal} header=" ">
                  <div className="meeting-room-kick-msg">
                    사용자 [{this.state.nickname}] 를 강퇴하시겠습니까?
                  </div>

                  <button
                    className="meeting-room-kick-ok"
                    onClick={() => {
                      this.handleExitUser();
                      this.props.sendSignalUserKicked(this.props.user.getNickname());
                    }}
                  >
                    확인
                  </button>
                  <button className="meeting-room-kick-cancel" onClick={this.closeModal}>
                    취소
                  </button>
                </Modal>
              </div>
            )}
            <div id="status-icons">
              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MdMicOff style={{ color: "#6667AB" }} size={"2.3rem"} />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
