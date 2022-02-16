import React, { Component } from "react";
import {
  MdVideocamOff,
  MdVideocam,
  MdMicOff,
  MdMic,
  MdScreenShare,
  MdStopScreenShare,
} from "react-icons/md";
import { FcSwitchCamera } from "react-icons/fc";
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
          <div className="button-audio">
            {localUser !== undefined && localUser.isAudioActive() ? (
              <MdMic
                onClick={this.micStatusChanged}
                style={{ cursor: "pointer", color: "#6667AB" }}
                size={"2rem"}
              />
            ) : (
              <MdMicOff
                onClick={this.micStatusChanged}
                style={{ cursor: "pointer", color: "gray" }}
                size={"2rem"}
              />
            )}
          </div>
          <div className="button-video">
            {localUser !== undefined && localUser.isVideoActive() ? (
              <MdVideocam
                onClick={this.camStatusChanged}
                style={{
                  cursor: "pointer",
                  color: "#6667AB",
                }}
                size={"2rem"}
              />
            ) : (
              <MdVideocamOff
                onClick={this.camStatusChanged}
                style={{ cursor: "pointer", color: "gray" }}
                size={"2rem"}
              />
            )}
          </div>
          <div className="button-share">
            {localUser !== undefined && localUser.isScreenShareActive() ? (
              <FcSwitchCamera
                onClick={this.screenShare}
                style={{
                  cursor: "pointer",
                  color: "#6667AB",
                }}
                size={"2rem"}
              />
            ) : (
              <MdScreenShare
                onClick={this.screenShare}
                style={{ cursor: "pointer", color: "gray" }}
                size={"2rem"}
              />
            )}
            {localUser !== undefined && localUser.isScreenShareActive() && (
              <MdStopScreenShare
                onClick={this.stopScreenShare}
                style={{ cursor: "pointer", color: "gray" }}
                size={"2rem"}
              />
            )}
          </div>

          {/* <IconButton color="inherit" className="navButton" onClick={this.screenShare}>
            {localUser !== undefined && localUser.isScreenShareActive() ? (
              <PictureInPicture />
            ) : (
              <ScreenShare />
            )}
          </IconButton> */}
          {/*   */}

          <div className="button-exit">
            <Link to="/home/tab=todays">
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
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
