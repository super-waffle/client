import React, { Component } from "react";
import { MdVideocamOff, MdVideocam, MdMicOff, MdMic } from "react-icons/md";
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./ToolbarComponent.css";

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  switchCamera() {
    this.props.switchCamera();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  render() {
    // const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      // <div className="button-toolbar">
      <div className="buttons-content">
        <div className="buttons-video">
          <div>
            {localUser !== undefined && localUser.isAudioActive() ? (
              <div className="button-audio" onClick={this.micStatusChanged}>
                <MdMic style={{ cursor: "pointer", color: "#6667AB" }} size={"2rem"} />
                <span>Mute</span>
              </div>
            ) : (
              <div className="button-audio" onClick={this.micStatusChanged}>
                <MdMicOff style={{ cursor: "pointer", color: "gray" }} size={"2rem"} />
                <span>UnMute</span>
              </div>
            )}
          </div>
          <div>
            {localUser !== undefined && localUser.isVideoActive() ? (
              <div className="button-video" onClick={this.camStatusChanged}>
                <MdVideocam
                  style={{
                    cursor: "pointer",
                    color: "#6667AB",
                  }}
                  size={"2rem"}
                />
                <span>Stop Video</span>
              </div>
            ) : (
              <div className="button-video" onClick={this.camStatusChanged}>
                <MdVideocamOff style={{ cursor: "pointer", color: "gray" }} size={"2rem"} />
                <span>Start Video</span>
              </div>
            )}
          </div>
          <div className="button-exit" onClick={this.leaveSession}>
            <Link to="/meetingrooms">
              <HiOutlineX
                style={{
                  cursor: "pointer",
                  color: "#fcfcfc",
                }}
                size={"1.7rem"}
              ></HiOutlineX>
            </Link>
          </div>
        </div>
        <div className="buttons-util">
          <div className="button-users">
            <svg
              width="30"
              height="30"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.toggleChat}
            >
              <path
                d="M9 10.5001C8.99998 10.5658 9.0129 10.6308 9.03803 10.6915C9.06315 10.7521 9.09998 10.8073 9.14641 10.8537C9.19284 10.9001 9.24797 10.937 9.30864 10.9621C9.36931 10.9872 9.43433 11.0001 9.5 11.0001H14.5C14.6326 11.0001 14.7598 10.9474 14.8536 10.8537C14.9473 10.7599 15 10.6327 15 10.5001C15 10.3675 14.9473 10.2403 14.8536 10.1466C14.7598 10.0528 14.6326 10.0001 14.5 10.0001H9.5C9.43433 10.0001 9.36931 10.013 9.30864 10.0381C9.24797 10.0633 9.19284 10.1001 9.14641 10.1465C9.09998 10.193 9.06315 10.2481 9.03803 10.3088C9.0129 10.3694 8.99998 10.4344 9 10.5001Z"
                fill="#6667ab"
                fill-opacity="0.95"
              />
              <path
                d="M14.5 12.0001H9.5C9.36739 12.0001 9.24021 12.0528 9.14645 12.1466C9.05268 12.2403 9 12.3675 9 12.5001C9 12.6327 9.05268 12.7599 9.14645 12.8537C9.24021 12.9474 9.36739 13.0001 9.5 13.0001H14.5C14.6326 13.0001 14.7598 12.9474 14.8536 12.8537C14.9473 12.7599 15 12.6327 15 12.5001C15 12.3675 14.9473 12.2403 14.8536 12.1466C14.7598 12.0528 14.6326 12.0001 14.5 12.0001Z"
                fill="#6667ab"
                fill-opacity="0.95"
              />
              <path
                d="M14.5 14.0001H9.5C9.36739 14.0001 9.24021 14.0528 9.14645 14.1466C9.05268 14.2403 9 14.3675 9 14.5001C9 14.6327 9.05268 14.7599 9.14645 14.8537C9.24021 14.9474 9.36739 15.0001 9.5 15.0001H14.5C14.6326 15.0001 14.7598 14.9474 14.8536 14.8537C14.9473 14.7599 15 14.6327 15 14.5001C15 14.3675 14.9473 14.2403 14.8536 14.1466C14.7598 14.0528 14.6326 14.0001 14.5 14.0001Z"
                fill="#6667ab"
                fill-opacity="0.95"
              />
              <path
                d="M7.48097 13.9879C5.24293 14.068 3.18825 13.5909 2.36622 12.7985C2.25519 12.7039 2.16522 12.5872 2.10214 12.4557C2.03906 12.3243 2.00427 12.181 2.00001 12.0353C2.00001 9.57677 4.2898 7.50011 7.00001 7.50011C8.15441 7.49907 9.27717 7.87735 10.1956 8.57677C10.2476 8.61685 10.3071 8.64627 10.3705 8.66336C10.434 8.68045 10.5001 8.68487 10.5653 8.67637C10.6304 8.66787 10.6933 8.64661 10.7502 8.61382C10.8071 8.58102 10.857 8.53732 10.8971 8.48523C10.9371 8.43313 10.9665 8.37366 10.9835 8.31021C11.0006 8.24675 11.0049 8.18056 10.9964 8.11542C10.9878 8.05028 10.9665 7.98747 10.9336 7.93056C10.9008 7.87366 10.8571 7.82379 10.8049 7.7838C10.2541 7.36254 9.6363 7.03693 8.97744 6.82061C9.51599 6.40655 9.91126 5.83416 10.1077 5.18386C10.3041 4.53356 10.2919 3.83806 10.0727 3.19509C9.85341 2.55212 9.43822 1.99401 8.88541 1.59919C8.3326 1.20437 7.66998 0.99269 6.99066 0.993902C6.31134 0.995113 5.64948 1.20915 5.09808 1.60594C4.54669 2.00273 4.13349 2.56232 3.91654 3.20607C3.6996 3.84982 3.68982 4.54536 3.88858 5.19495C4.08735 5.84454 4.48466 6.41553 5.02468 6.82766C2.70932 7.60097 1 9.67055 1 12.0353C1.00436 12.3153 1.06628 12.5915 1.18191 12.8466C1.29753 13.1017 1.46439 13.3303 1.67212 13.5182C2.80762 14.6129 5.08081 14.9962 7.00269 14.9962C7.17725 14.9962 7.34936 14.9933 7.51709 14.9869C7.58271 14.9846 7.64723 14.9694 7.70696 14.9421C7.7667 14.9148 7.82047 14.876 7.8652 14.828C7.90994 14.7799 7.94476 14.7235 7.96768 14.662C7.9906 14.6004 8.00117 14.535 7.99878 14.4694C7.99727 14.4035 7.98258 14.3385 7.95557 14.2784C7.92855 14.2183 7.88977 14.1642 7.8415 14.1193C7.79323 14.0745 7.73646 14.0397 7.67454 14.0171C7.61261 13.9946 7.5468 13.9846 7.48097 13.9879ZM6.99634 2.00011C7.44135 2.00011 7.87636 2.13207 8.24637 2.37931C8.61638 2.62654 8.90477 2.97794 9.07507 3.38907C9.24537 3.80021 9.28992 4.25261 9.20311 4.68906C9.11629 5.12552 8.902 5.52643 8.58733 5.8411C8.27266 6.15577 7.87175 6.37006 7.43529 6.45688C6.99884 6.5437 6.54644 6.49914 6.1353 6.32884C5.72417 6.15854 5.37277 5.87016 5.12553 5.50014C4.8783 5.13013 4.74634 4.69512 4.74634 4.25011C4.74699 3.65357 4.98425 3.08166 5.40607 2.65984C5.82788 2.23802 6.3998 2.00076 6.99634 2.00011Z"
                fill="#6667ab"
                fill-opacity="0.95"
              />
            </svg>
          </div>
          <div className="button-chat">
            {/* {this.props.showNotification && <div id="point" className="" />} */}

            <svg
              width="30"
              height="30"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.toggleChat}
            >
              <path
                d="M2.98885 14.5004C2.45855 14.5075 1.93235 14.4067 1.44225 14.204C1.32265 14.1496 1.21934 14.0649 1.14252 13.9582C1.0657 13.8516 1.01804 13.7268 1.00425 13.5961C0.990307 13.4669 1.01082 13.3363 1.0637 13.2175C1.11659 13.0988 1.19996 12.9961 1.30535 12.92C1.3659 12.8756 1.436 12.8307 1.51315 12.7819C1.99413 12.5034 2.36084 12.0634 2.54815 11.5402C1.76073 10.3278 1.39987 8.8876 1.52262 7.4472C1.64538 6.00679 2.24475 4.6484 3.22597 3.58679C4.20719 2.52517 5.51428 1.8209 6.94058 1.58532C8.36688 1.34974 9.83101 1.5963 11.1015 2.28601C12.372 2.97572 13.3763 4.06923 13.9557 5.39366C14.5351 6.71808 14.6566 8.19785 14.3008 9.59902C13.9451 11.0002 13.1324 12.2428 11.9914 13.1304C10.8503 14.018 9.44597 14.4999 8.00035 14.5C7.04012 14.4996 6.0918 14.2874 5.223 13.8784C4.55001 14.2881 3.77672 14.5034 2.98885 14.5004ZM2.3319 13.4374C2.77429 13.5266 3.23025 13.5245 3.67178 13.4311C4.11331 13.3377 4.5311 13.1551 4.8995 12.8944C4.97512 12.8408 5.06418 12.8092 5.1567 12.8033C5.24923 12.7974 5.34158 12.8173 5.42345 12.8608C6.61495 13.4931 7.99722 13.6658 9.30767 13.346C10.6181 13.0262 11.7654 12.2361 12.5317 11.126C13.2979 10.0158 13.6297 8.6629 13.4639 7.32421C13.2982 5.98552 12.6465 4.75434 11.6327 3.86457C10.6189 2.97479 9.31352 2.48841 7.96464 2.49782C6.61577 2.50723 5.31734 3.01178 4.31602 3.91562C3.3147 4.81945 2.68026 6.0596 2.53322 7.40048C2.38619 8.74135 2.7368 10.0895 3.51845 11.1889C3.56597 11.2555 3.59639 11.3328 3.60703 11.4139C3.61768 11.4951 3.60822 11.5776 3.5795 11.6542C3.35683 12.3627 2.92119 12.9854 2.3319 13.4374Z"
                fill="#6667ab"
                fill-opacity="0.95"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
