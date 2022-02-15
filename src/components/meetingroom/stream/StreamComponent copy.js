import React, { Component } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';
import Modal from '../../modal';
import axios from 'axios';

import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import FormHelperText from '@material-ui/core/FormHelperText';

const token = localStorage.getItem('accessToken');
export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
      isHovering: false,
      modalOpen: false,
      Msg:'',
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
    // `/meetings/${this.props.meetingSeq}/kick/${this.props.user_seq}`,
    
    return new Promise((resolve, reject) => {
      axios
        .post(
          process.env.REACT_APP_SERVER_URL +
            `/meetings/${this.props.meetingSeq}/kick/32`,
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          const STATUS = res.data.statusCode;
          resolve(res.data.statusCode);
          if (STATUS === 200) {
            this.setState({ Msg:'강퇴완료' });
            console.log(STATUS);
          } else if (STATUS === 201) {
            this.setState({ Msg:'강퇴완료' });
          } else if (STATUS === 409) { 
            this.setState({ Msg:'host가 아닙니다' });
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });

      // console.log('강퇴');
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
    if (event.key === 'Enter') {
      console.log(this.state.nickname);
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
        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div
            className="streamComponent"
            onMouseEnter={this.handlerMouseON}
            onMouseLeave={this.handlerMouseOff}
          >
            {/* {this.props.user.isAudioActive()?():()} */}
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />
            {this.props.user.isVideoActive() ? (
              <div className="video-username">{this.state.nickname}</div>
            ) : (
              <div className="video-camoff">{this.state.nickname}</div>
            )}
            <div className="video-time">02:48</div>
            {this.props.user.type === 'remote' && this.props.local.host && (
              <div id="status-exiticons">
                {this.state.isHovering && (
                  <div
                    id="exitIcon"
                    onClick={this.openModal}
                    style={{ cursor: 'pointer' }}
                  >
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

                <Modal
                  open={this.state.modalOpen}
                  close={this.closeModal}
                  header=" "
                >
                  <div className="studyapply-modal-msg">
                    {this.state.nickname}을 강퇴하시겠습니까?
                  </div>

                  <button
                    className="studyapply-modal-go-to-mystudy"
                    onClick={this.handleExitUser}
                  >
                    확인
                  </button>
                  <button
                    className="studyapply-modal-ok"
                    onClick={this.closeModal}
                  >
                    취소
                  </button>
                </Modal>
              </div>
            )}

            <div id="status-icons">
              {/* {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOff id="statusCam" />
                </div>
              ) : null} */}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1140_5144)">
                      <path
                        d="M528 448H112C103.2 448 96 455.2 96 464V496C96 504.8 103.2 512 112 512H528C536.8 512 544 504.8 544 496V464C544 455.2 536.8 448 528 448ZM592 128C565.5 128 544 149.5 544 176C544 183.1 545.6 189.7 548.4 195.8L476 239.2C460.6 248.4 440.7 243.2 431.8 227.6L350.3 85C361 76.2 368 63 368 48C368 21.5 346.5 0 320 0C293.5 0 272 21.5 272 48C272 63 279 76.2 289.7 85L208.2 227.6C199.3 243.2 179.3 248.4 164 239.2L91.7 195.8C94.4 189.8 96.1 183.1 96.1 176C96.1 149.5 74.6 128 48.1 128C21.6 128 0 149.5 0 176C0 202.5 21.5 224 48 224C50.6 224 53.2 223.6 55.7 223.2L128 416H512L584.3 223.2C586.8 223.6 589.4 224 592 224C618.5 224 640 202.5 640 176C640 149.5 618.5 128 592 128Z"
                        fill="black"
                      />
                      <path
                        d="M1.70703 1.70728L17.9999 18.0002"
                        stroke="#FF4C4C"
                        stroke-linecap="round"
                      />
                      <path
                        d="M15.0015 17.5002H13.7643C13.0268 17.5185 12.3077 17.2686 11.7405 16.7969C11.1732 16.3253 10.7964 15.6638 10.6798 14.9354C11.5411 14.7759 12.3196 14.3203 12.8804 13.6472C13.4412 12.9742 13.7489 12.1263 13.7502 11.2502V5.00024C13.7502 4.00568 13.3552 3.05186 12.6519 2.34859C11.9486 1.64533 10.9948 1.25024 10.0002 1.25024C9.00568 1.25024 8.05186 1.64533 7.3486 2.34859C6.64533 3.05186 6.25025 4.00568 6.25025 5.00024V11.2502C6.2518 12.1428 6.57145 13.0056 7.15181 13.6837C7.73217 14.3618 8.53524 14.8108 9.41685 14.9502C9.53458 15.9168 9.97518 16.8153 10.6673 17.5002H5.00147C4.8357 17.5002 4.67673 17.5661 4.55952 17.6833C4.44231 17.8005 4.37646 17.9595 4.37646 18.1252C4.37646 18.291 4.44231 18.45 4.55952 18.5672C4.67673 18.6844 4.8357 18.7502 5.00147 18.7502H15.0015C15.1672 18.7502 15.3262 18.6844 15.4434 18.5672C15.5606 18.45 15.6265 18.291 15.6265 18.1252C15.6265 17.9595 15.5606 17.8005 15.4434 17.6833C15.3262 17.5661 15.1672 17.5002 15.0015 17.5002ZM7.50025 9.36774V8.12524H12.5002V9.36774H7.50025ZM10.0002 2.50024C10.6631 2.50091 11.2986 2.76451 11.7673 3.23321C12.236 3.70191 12.4996 4.33741 12.5002 5.00024V6.87524H7.50025V5.00024C7.50091 4.33741 7.76451 3.70191 8.23321 3.23321C8.70191 2.76451 9.33741 2.50091 10.0002 2.50024Z"
                        fill="#FF4D4D"
                      />
                      <path
                        d="M7.5 9.375H12.5V11.25C12.5 12.6307 11.3807 13.75 10 13.75C8.61929 13.75 7.5 12.6307 7.5 11.25V9.375Z"
                        fill="#FF4D4D"
                      />
                      <rect
                        x="7.5"
                        y="6.875"
                        width="5"
                        height="1.25"
                        fill="#FF4D4D"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1140_5144">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              ) : null}
            </div>
            <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <VolumeOff color="secondary" />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
