import React, { Component } from "react";
import { MdVideocamOff, MdVideocam, MdMicOff, MdMic } from "react-icons/md";
import "./UserComponent.css";
// import { Container } from "react-bootstrap";
import UserStatus from "./UserStatus";
import { HiMenu } from "react-icons/hi";

class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.local = {};
    this.remotes = [];
    this.isHose = false;
    this.consoleUser = this.consoleUser.bind(this);
    this.subscribersMuteStatusChanged = this.subscribersMuteStatusChanged.bind(this);
    this.subscribersCamStatusChanged = this.subscribersCamStatusChanged.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
  }
  subscribersMuteStatusChanged(key, status, nickname) {
    this.props.subscribersMuteStatusChanged(key, status, nickname);
  }

  subscribersCamStatusChanged(key, status, nickname) {
    this.props.subscribersCamStatusChanged(key, status, nickname);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  componentDidUpdate() {
    this.consoleUser();
  }
  consoleUser() {
    this.local = this.props.local;
    this.remotes = this.props.remote;
    this.isHost = this.props.isHost;
  }
  render() {
    return (
      <div className="meeting-userlist-container">
        <div className="userlist-component">
          <div className="userlist-toolbar">
            <span className="userlist-toolbar-menu">
              <HiMenu size={"24px"} margintop={"2px"} />
            </span>
            <span className="userlist-toolbar-name">사용자목록</span>
          </div>
          <div className="list-wrap">
            {/* 로컬유저 목록 */}
            <div className="user">
              {/*  style={{ alignItems: "center", display: "flex" }} */}
              {/* 로컬유저 닉네임 */}

              <span className="user-name-local">{this.local.nickname}</span>

              {/* 로컬유저 마이크, 카메라 상태*/}

              {/* 비디오 버튼 */}
              <span className="user-video">
                {this.local.videoActive ? (
                  <MdVideocam
                    onClick={this.camStatusChanged}
                    style={{ color: "#6667AB" }}
                    size={"1.34rem"}
                  />
                ) : (
                  <MdVideocamOff
                    onClick={this.camStatusChanged}
                    style={{ color: "gray" }}
                    size={"1.35rem"}
                  />
                )}
              </span>
              {/* 마이크 버튼 */}
              <span className="user-audio">
                {this.local.audioActive ? (
                  <MdMic
                    onClick={this.micStatusChanged}
                    style={{ color: "#6667AB" }}
                    size={"1.34rem"}
                  />
                ) : (
                  <MdMicOff
                    onClick={this.micStatusChanged}
                    style={{ color: "gray" }}
                    size={"1.35rem"}
                  />
                )}
              </span>
            </div>
            {/* 리모트유저 목록 */}
            {this.remotes &&
              this.remotes.map((sub, i) => (
                <UserStatus
                  subscribersMuteStatusChanged={this.subscribersMuteStatusChanged}
                  subscribersCamStatusChanged={this.subscribersCamStatusChanged}
                  user={sub}
                  index={i}
                  isHost={this.isHost}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}
export default UserComponent;
