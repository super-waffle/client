import React, { Component } from "react";
import { MdVideocamOff, MdVideocam, MdMicOff, MdMic } from "react-icons/md";
import "./UserComponent.css";
import UserStatus from "./UserStatus";
import { HiMenu } from "react-icons/hi";

var absentMembers = [];
class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.local = {};
    this.remotes = this.props.remote;
    this.isHost = false;
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
      <div className="study-userlist-container">
        <div className="userlist-component">
          <div className="userlist-toolbar">
            <span className="userlist-toolbar-menu">
              <HiMenu size={"24px"} margintop={"2px"} />
            </span>
            <span className="userlist-toolbar-name">스터디원 목록</span>
          </div>
          <div className="list-wrap">
            {/* 로컬유저 목록 */}
            <div className="user">
              {/*  style={{ alignItems: "center", display: "flex" }} */}
              {/* 로컬유저 닉네임 */}
              {/* {this.props.hostMember.userNickname == */}
              <div className="user-attend">
                {this.props.isLate ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.83102 0.666748C4.79027 0.666748 0.666016 4.791 0.666016 9.83175C0.666016 14.8725 4.79027 18.9967 9.83102 18.9967C14.8718 18.9967 18.996 14.8725 18.996 9.83175C18.996 4.791 14.8718 0.666748 9.83102 0.666748ZM13.6803 13.681L8.91452 10.7482V5.24925H10.2893V10.015L14.4135 12.4896L13.6803 13.681Z"
                      fill="#E8D07E"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.99967 0.833252C4.93717 0.833252 0.833008 4.93742 0.833008 9.99992C0.833008 15.0624 4.93717 19.1666 9.99967 19.1666C15.0622 19.1666 19.1663 15.0624 19.1663 9.99992C19.1663 4.93742 15.0622 0.833252 9.99967 0.833252ZM13.973 8.44992C14.0462 8.36629 14.1019 8.26887 14.1368 8.16339C14.1718 8.05792 14.1853 7.94651 14.1766 7.83574C14.1678 7.72496 14.137 7.61705 14.086 7.51836C14.0349 7.41966 13.9647 7.33217 13.8793 7.26104C13.7939 7.1899 13.6952 7.13655 13.5889 7.10414C13.4826 7.07172 13.3709 7.06089 13.2604 7.07227C13.1499 7.08366 13.0427 7.11704 12.9453 7.17045C12.8479 7.22385 12.7621 7.29621 12.693 7.38325L9.10967 11.6824L7.25551 9.82742C7.09834 9.67562 6.88784 9.59162 6.66934 9.59352C6.45084 9.59542 6.24183 9.68306 6.08733 9.83757C5.93282 9.99208 5.84518 10.2011 5.84328 10.4196C5.84138 10.6381 5.92538 10.8486 6.07717 11.0058L8.57717 13.5058C8.65905 13.5876 8.75709 13.6515 8.86502 13.6933C8.97295 13.7351 9.08842 13.754 9.20406 13.7488C9.31971 13.7435 9.43299 13.7142 9.53668 13.6628C9.64038 13.6113 9.73221 13.5388 9.80634 13.4499L13.973 8.44992Z"
                      fill="#6667AB"
                    />
                  </svg>
                )}
              </div>
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

              {/* 내가 호스트면 왕관 */}
              {this.props.hostMember.userNickname == this.local.nickname && (
                <div className="user-host">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 640 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M528 448H112C103.2 448 96 455.2 96 464V496C96 504.8 103.2 512 112 512H528C536.8 512 544 504.8 544 496V464C544 455.2 536.8 448 528 448ZM592 128C565.5 128 544 149.5 544 176C544 183.1 545.6 189.7 548.4 195.8L476 239.2C460.6 248.4 440.7 243.2 431.8 227.6L350.3 85C361 76.2 368 63 368 48C368 21.5 346.5 0 320 0C293.5 0 272 21.5 272 48C272 63 279 76.2 289.7 85L208.2 227.6C199.3 243.2 179.3 248.4 164 239.2L91.7 195.8C94.4 189.8 96.1 183.1 96.1 176C96.1 149.5 74.6 128 48.1 128C21.6 128 0 149.5 0 176C0 202.5 21.5 224 48 224C50.6 224 53.2 223.6 55.7 223.2L128 416H512L584.3 223.2C586.8 223.6 589.4 224 592 224C618.5 224 640 202.5 640 176C640 149.5 618.5 128 592 128Z"
                      fill="#F2C831"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="user-attend-list">
              {/* 리모트유저 목록 */}
              {this.props.remote &&
                this.props.remote.map((sub, i) => (
                  <UserStatus
                    hostNickname={this.props.hostMember.userNickname}
                    subscribersMuteStatusChanged={this.subscribersMuteStatusChanged}
                    subscribersCamStatusChanged={this.subscribersCamStatusChanged}
                    user={sub}
                    index={i}
                    key={i}
                    isHost={this.isHost}
                    isRemote={true}
                  />
                ))}
            </div>

            {this.props.absentMembers && (
              <div className="user-absent-list">
                {/* 접속하지 않은 스터디원 목록 */}
                {this.props.absentMembers.map((sub, i) => (
                  <UserStatus
                    hostNickname={this.props.hostMember.userNickname}
                    subscribersMuteStatusChanged={this.subscribersMuteStatusChanged}
                    subscribersCamStatusChanged={this.subscribersCamStatusChanged}
                    user={sub}
                    index={i}
                    key={i}
                    isHost={this.isHost}
                    isRemote={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default UserComponent;
