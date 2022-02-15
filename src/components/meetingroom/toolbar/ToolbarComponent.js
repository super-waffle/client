import React, { Component } from "react";
import "./ToolbarComponent.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Fullscreen from "@material-ui/icons/Fullscreen";
import FullscreenExit from "@material-ui/icons/FullscreenExit";
import SwitchVideoIcon from "@material-ui/icons/SwitchVideo";
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import ScreenShare from "@material-ui/icons/ScreenShare";
import StopScreenShare from "@material-ui/icons/StopScreenShare";
import Tooltip from "@material-ui/core/Tooltip";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";

import IconButton from "@material-ui/core/IconButton";
import { MdMic } from "react-icons/md";

// const logo = require('../../assets/images/openvidu_logo.png');

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
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      // <div className="button-toolbar">
      <div className="buttons-content">
        <div className="buttons-video">
          <div className="button-audio">
            {localUser !== undefined && localUser.isAudioActive() ? (
              <svg
                width="30"
                height="30"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={this.micStatusChanged}
              >
                <path
                  d="M15.0015 17.5002H13.7643C13.0268 17.5185 12.3077 17.2686 11.7405 16.7969C11.1732 16.3253 10.7964 15.6638 10.6798 14.9354C11.5411 14.7759 12.3196 14.3203 12.8804 13.6472C13.4412 12.9742 13.7489 12.1263 13.7502 11.2502V5.00024C13.7502 4.00568 13.3552 3.05186 12.6519 2.34859C11.9486 1.64533 10.9948 1.25024 10.0002 1.25024C9.00568 1.25024 8.05186 1.64533 7.3486 2.34859C6.64533 3.05186 6.25025 4.00568 6.25025 5.00024V11.2502C6.2518 12.1428 6.57145 13.0056 7.15181 13.6837C7.73217 14.3618 8.53524 14.8108 9.41685 14.9502C9.53458 15.9168 9.97518 16.8153 10.6673 17.5002H5.00147C4.8357 17.5002 4.67673 17.5661 4.55952 17.6833C4.44231 17.8005 4.37646 17.9595 4.37646 18.1252C4.37646 18.291 4.44231 18.45 4.55952 18.5672C4.67673 18.6844 4.8357 18.7502 5.00147 18.7502H15.0015C15.1672 18.7502 15.3262 18.6844 15.4434 18.5672C15.5606 18.45 15.6265 18.291 15.6265 18.1252C15.6265 17.9595 15.5606 17.8005 15.4434 17.6833C15.3262 17.5661 15.1672 17.5002 15.0015 17.5002ZM7.50025 9.36774V8.12524H12.5002V9.36774H7.50025ZM10.0002 2.50024C10.6631 2.50091 11.2986 2.76451 11.7673 3.23321C12.236 3.70191 12.4996 4.33741 12.5002 5.00024V6.87524H7.50025V5.00024C7.50091 4.33741 7.76451 3.70191 8.23321 3.23321C8.70191 2.76451 9.33741 2.50091 10.0002 2.50024Z"
                  fill="black"
                />
                <path
                  d="M7.5 9.375H12.5V11.25C12.5 12.6307 11.3807 13.75 10 13.75C8.61929 13.75 7.5 12.6307 7.5 11.25V9.375Z"
                  fill="black"
                />
                <rect x="7.5" y="6.875" width="5" height="1.25" fill="black" />
              </svg>
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={this.micStatusChanged}
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
                  <rect x="7.5" y="6.875" width="5" height="1.25" fill="#FF4D4D" />
                </g>
                <defs>
                  <clipPath id="clip0_1140_5144">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </div>
          <div className="button-video">
            {localUser !== undefined && localUser.isVideoActive() ? (
              <svg
                width="30"
                height="30"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={this.camStatusChanged}
              >
                <path
                  d="M18.6565 5.8114C18.4756 5.69859 18.2687 5.63428 18.0558 5.62466C17.8428 5.61503 17.631 5.66043 17.4407 5.75647C17.4216 5.76609 17.4031 5.77668 17.3851 5.78821L15.501 6.98587V6.25024C15.5 5.42174 15.1705 4.62745 14.5846 4.04161C13.9988 3.45577 13.2045 3.12622 12.376 3.12524H4.87598C4.04747 3.12622 3.25318 3.45577 2.66734 4.04161C2.0815 4.62745 1.75195 5.42174 1.75098 6.25024V13.7502C1.75195 14.5787 2.0815 15.373 2.66734 15.9589C3.25318 16.5447 4.04747 16.8743 4.87598 16.8752H12.376C13.2045 16.8743 13.9988 16.5447 14.5846 15.9589C15.1704 15.373 15.5 14.5787 15.501 13.7502V13.0134L17.3851 14.211C17.4028 14.2226 17.4211 14.233 17.4401 14.2422C17.6306 14.3376 17.8424 14.3828 18.0553 14.3733C18.2682 14.3639 18.4751 14.3001 18.6564 14.1881C18.8377 14.0761 18.9874 13.9196 19.0911 13.7335C19.1949 13.5473 19.2493 13.3377 19.2491 13.1246V6.87461C19.2499 6.66143 19.1958 6.45164 19.092 6.26543C18.9882 6.07922 18.8382 5.92286 18.6565 5.8114ZM14.251 13.7502C14.2504 14.2474 14.0527 14.724 13.7012 15.0755C13.3497 15.427 12.8731 15.6247 12.376 15.6252H4.87598C4.37886 15.6247 3.90227 15.427 3.55075 15.0755C3.19924 14.724 3.00152 14.2474 3.00098 13.7502V6.25024C3.00152 5.75313 3.19924 5.27653 3.55075 4.92502C3.90226 4.57351 4.37886 4.37579 4.87598 4.37524H12.376C12.8731 4.37579 13.3497 4.57351 13.7012 4.92502C14.0527 5.27653 14.2504 5.75313 14.251 6.25024V13.7502ZM15.501 11.5327V8.46658L17.9991 6.87891L18.0004 13.121L15.501 11.5327Z"
                  fill="black"
                  fill-opacity="0.95"
                />
                <path
                  d="M6.125 8.75C6.81536 8.75 7.375 8.19036 7.375 7.5C7.375 6.80964 6.81536 6.25 6.125 6.25C5.43464 6.25 4.875 6.80964 4.875 7.5C4.875 8.19036 5.43464 8.75 6.125 8.75Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={this.camStatusChanged}
              >
                <path
                  d="M20.1565 5.8114C19.9756 5.69859 19.7687 5.63428 19.5558 5.62466C19.3428 5.61503 19.131 5.66043 18.9407 5.75647C18.9216 5.76609 18.9031 5.77668 18.8851 5.78821L17.001 6.98587V6.25024C17 5.42174 16.6705 4.62745 16.0846 4.04161C15.4988 3.45577 14.7045 3.12622 13.876 3.12524H6.37598C5.54747 3.12622 4.75318 3.45577 4.16734 4.04161C3.5815 4.62745 3.25195 5.42174 3.25098 6.25024V13.7502C3.25195 14.5787 3.5815 15.373 4.16734 15.9589C4.75318 16.5447 5.54747 16.8743 6.37598 16.8752H13.876C14.7045 16.8743 15.4988 16.5447 16.0846 15.9589C16.6704 15.373 17 14.5787 17.001 13.7502V13.0134L18.8851 14.211C18.9028 14.2226 18.9211 14.233 18.9401 14.2422C19.1306 14.3376 19.3424 14.3828 19.5553 14.3733C19.7682 14.3639 19.9751 14.3001 20.1564 14.1881C20.3377 14.0761 20.4874 13.9196 20.5911 13.7335C20.6949 13.5473 20.7493 13.3377 20.7491 13.1246V6.87461C20.7499 6.66143 20.6958 6.45164 20.592 6.26543C20.4882 6.07922 20.3382 5.92286 20.1565 5.8114ZM15.751 13.7502C15.7504 14.2474 15.5527 14.724 15.2012 15.0755C14.8497 15.427 14.3731 15.6247 13.876 15.6252H6.37598C5.87886 15.6247 5.40227 15.427 5.05075 15.0755C4.69924 14.724 4.50152 14.2474 4.50098 13.7502V6.25024C4.50152 5.75313 4.69924 5.27653 5.05075 4.92502C5.40226 4.57351 5.87886 4.37579 6.37598 4.37524H13.876C14.3731 4.37579 14.8497 4.57351 15.2012 4.92502C15.5527 5.27653 15.7504 5.75313 15.751 6.25024V13.7502ZM17.001 11.5327V8.46658L19.4991 6.87891L19.5004 13.121L17.001 11.5327Z"
                  fill="#FF4C4C"
                />
                <line
                  x1="0.706849"
                  y1="0.980896"
                  x2="18.9809"
                  y2="18.2932"
                  stroke="#FF4C4C"
                  stroke-linecap="round"
                />
              </svg>
            )}
          </div>
          <div className="button-exit">
            <svg
              width="30"
              height="30"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.leaveSession}
            >
              <rect x="0.5" width="40" height="40" rx="20" fill="#DB1F2E" />
              <path
                d="M21.3838 19.9998L26.5669 14.8166C26.625 14.7586 26.671 14.6897 26.7024 14.6139C26.7338 14.5381 26.75 14.4568 26.75 14.3747C26.75 14.2927 26.7338 14.2114 26.7024 14.1356C26.671 14.0598 26.625 13.9909 26.5669 13.9329C26.5089 13.8748 26.44 13.8288 26.3642 13.7974C26.2884 13.766 26.2071 13.7498 26.125 13.7498C26.043 13.7498 25.9617 13.766 25.8859 13.7974C25.8101 13.8288 25.7412 13.8748 25.6831 13.9329L20.5 19.116L15.3169 13.9329C15.259 13.8743 15.1901 13.8278 15.1141 13.7959C15.0381 13.7641 14.9566 13.7475 14.8743 13.7473C14.7919 13.7471 14.7103 13.7631 14.6341 13.7946C14.558 13.826 14.4888 13.8721 14.4306 13.9304C14.3723 13.9886 14.3262 14.0578 14.2948 14.1339C14.2634 14.2101 14.2473 14.2917 14.2476 14.374C14.2478 14.4564 14.2643 14.5379 14.2962 14.6139C14.328 14.6898 14.3746 14.7588 14.4331 14.8167L19.6163 19.9998L14.4331 25.1829C14.3751 25.2409 14.3291 25.3098 14.2977 25.3857C14.2663 25.4615 14.2501 25.5427 14.2501 25.6248C14.2501 25.7069 14.2663 25.7881 14.2977 25.864C14.3291 25.9398 14.3751 26.0087 14.4331 26.0667C14.4912 26.1247 14.5601 26.1708 14.6359 26.2022C14.7117 26.2336 14.793 26.2497 14.875 26.2497C14.9571 26.2497 15.0384 26.2336 15.1142 26.2022C15.19 26.1708 15.2589 26.1247 15.3169 26.0667L20.5 20.8836L25.6832 26.0667C25.8004 26.1839 25.9593 26.2497 26.1251 26.2497C26.2908 26.2497 26.4498 26.1839 26.567 26.0667C26.6842 25.9495 26.75 25.7906 26.75 25.6248C26.75 25.4591 26.6842 25.3001 26.567 25.1829L21.3838 19.9998Z"
                fill="white"
                fill-opacity="0.95"
              />
            </svg>
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
            >
              <path
                d="M9 10.5001C8.99998 10.5658 9.0129 10.6308 9.03803 10.6915C9.06315 10.7521 9.09998 10.8073 9.14641 10.8537C9.19284 10.9001 9.24797 10.937 9.30864 10.9621C9.36931 10.9872 9.43433 11.0001 9.5 11.0001H14.5C14.6326 11.0001 14.7598 10.9474 14.8536 10.8537C14.9473 10.7599 15 10.6327 15 10.5001C15 10.3675 14.9473 10.2403 14.8536 10.1466C14.7598 10.0528 14.6326 10.0001 14.5 10.0001H9.5C9.43433 10.0001 9.36931 10.013 9.30864 10.0381C9.24797 10.0633 9.19284 10.1001 9.14641 10.1465C9.09998 10.193 9.06315 10.2481 9.03803 10.3088C9.0129 10.3694 8.99998 10.4344 9 10.5001Z"
                fill="black"
                fill-opacity="0.95"
              />
              <path
                d="M14.5 12.0001H9.5C9.36739 12.0001 9.24021 12.0528 9.14645 12.1466C9.05268 12.2403 9 12.3675 9 12.5001C9 12.6327 9.05268 12.7599 9.14645 12.8537C9.24021 12.9474 9.36739 13.0001 9.5 13.0001H14.5C14.6326 13.0001 14.7598 12.9474 14.8536 12.8537C14.9473 12.7599 15 12.6327 15 12.5001C15 12.3675 14.9473 12.2403 14.8536 12.1466C14.7598 12.0528 14.6326 12.0001 14.5 12.0001Z"
                fill="black"
                fill-opacity="0.95"
              />
              <path
                d="M14.5 14.0001H9.5C9.36739 14.0001 9.24021 14.0528 9.14645 14.1466C9.05268 14.2403 9 14.3675 9 14.5001C9 14.6327 9.05268 14.7599 9.14645 14.8537C9.24021 14.9474 9.36739 15.0001 9.5 15.0001H14.5C14.6326 15.0001 14.7598 14.9474 14.8536 14.8537C14.9473 14.7599 15 14.6327 15 14.5001C15 14.3675 14.9473 14.2403 14.8536 14.1466C14.7598 14.0528 14.6326 14.0001 14.5 14.0001Z"
                fill="black"
                fill-opacity="0.95"
              />
              <path
                d="M7.48097 13.9879C5.24293 14.068 3.18825 13.5909 2.36622 12.7985C2.25519 12.7039 2.16522 12.5872 2.10214 12.4557C2.03906 12.3243 2.00427 12.181 2.00001 12.0353C2.00001 9.57677 4.2898 7.50011 7.00001 7.50011C8.15441 7.49907 9.27717 7.87735 10.1956 8.57677C10.2476 8.61685 10.3071 8.64627 10.3705 8.66336C10.434 8.68045 10.5001 8.68487 10.5653 8.67637C10.6304 8.66787 10.6933 8.64661 10.7502 8.61382C10.8071 8.58102 10.857 8.53732 10.8971 8.48523C10.9371 8.43313 10.9665 8.37366 10.9835 8.31021C11.0006 8.24675 11.0049 8.18056 10.9964 8.11542C10.9878 8.05028 10.9665 7.98747 10.9336 7.93056C10.9008 7.87366 10.8571 7.82379 10.8049 7.7838C10.2541 7.36254 9.6363 7.03693 8.97744 6.82061C9.51599 6.40655 9.91126 5.83416 10.1077 5.18386C10.3041 4.53356 10.2919 3.83806 10.0727 3.19509C9.85341 2.55212 9.43822 1.99401 8.88541 1.59919C8.3326 1.20437 7.66998 0.99269 6.99066 0.993902C6.31134 0.995113 5.64948 1.20915 5.09808 1.60594C4.54669 2.00273 4.13349 2.56232 3.91654 3.20607C3.6996 3.84982 3.68982 4.54536 3.88858 5.19495C4.08735 5.84454 4.48466 6.41553 5.02468 6.82766C2.70932 7.60097 1 9.67055 1 12.0353C1.00436 12.3153 1.06628 12.5915 1.18191 12.8466C1.29753 13.1017 1.46439 13.3303 1.67212 13.5182C2.80762 14.6129 5.08081 14.9962 7.00269 14.9962C7.17725 14.9962 7.34936 14.9933 7.51709 14.9869C7.58271 14.9846 7.64723 14.9694 7.70696 14.9421C7.7667 14.9148 7.82047 14.876 7.8652 14.828C7.90994 14.7799 7.94476 14.7235 7.96768 14.662C7.9906 14.6004 8.00117 14.535 7.99878 14.4694C7.99727 14.4035 7.98258 14.3385 7.95557 14.2784C7.92855 14.2183 7.88977 14.1642 7.8415 14.1193C7.79323 14.0745 7.73646 14.0397 7.67454 14.0171C7.61261 13.9946 7.5468 13.9846 7.48097 13.9879ZM6.99634 2.00011C7.44135 2.00011 7.87636 2.13207 8.24637 2.37931C8.61638 2.62654 8.90477 2.97794 9.07507 3.38907C9.24537 3.80021 9.28992 4.25261 9.20311 4.68906C9.11629 5.12552 8.902 5.52643 8.58733 5.8411C8.27266 6.15577 7.87175 6.37006 7.43529 6.45688C6.99884 6.5437 6.54644 6.49914 6.1353 6.32884C5.72417 6.15854 5.37277 5.87016 5.12553 5.50014C4.8783 5.13013 4.74634 4.69512 4.74634 4.25011C4.74699 3.65357 4.98425 3.08166 5.40607 2.65984C5.82788 2.23802 6.3998 2.00076 6.99634 2.00011Z"
                fill="black"
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
                fill="black"
                fill-opacity="0.95"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
