import React, { Component } from "react";
import {
  MdVideocamOff,
  MdVideocam,
  MdMicOff,
  MdMic,
  MdScreenShare,
  MdStopScreenShare,
} from "react-icons/md";
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
    if (!this.props.user.isVideoActive()) this.camStatusChanged();
    this.props.screenShare();
  }

  stopScreenShare() {
    if (this.props.user.isVideoActive()) this.camStatusChanged();
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
          <div>
            {localUser !== undefined && !localUser.isScreenShareActive() && (
              <div onClick={this.screenShare} className="button-share">
                <MdScreenShare style={{ cursor: "pointer", color: "gray" }} size={"1.8rem"} />
                <span>Start Share</span>
              </div>
            )}
            {localUser !== undefined && localUser.isScreenShareActive() && (
              <div className="button-share" onClick={this.stopScreenShare}>
                <MdStopScreenShare
                  style={{
                    cursor: "pointer",
                    color: "#6667AB",
                  }}
                  size={"1.8rem"}
                />
                <span>Stop Share</span>
              </div>
            )}
          </div>

          <div className="button-exit" onClick={this.leaveSession}>
            <Link to="/home/tab=todays">
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
      </div>
    );
  }
}
