import React, { Component } from "react";
import { MdVideocamOff, MdVideocam, MdMicOff, MdMic } from "react-icons/md";
import "./UserComponent.css";
import UserStatus from "./UserStatus";
import { HiMenu } from "react-icons/hi";

var absentMembers = [];
class UserComponent extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   absentMembers:
    // };
    // console.log("안돼???");
    // console.log(this.state.absentMembers);
    this.local = {};
    this.remotes = this.props.remote;
    this.isHost = false;
    this.consoleUser = this.consoleUser.bind(this);
    this.subscribersMuteStatusChanged = this.subscribersMuteStatusChanged.bind(this);
    this.subscribersCamStatusChanged = this.subscribersCamStatusChanged.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    // this.hostNickname = this.props.hostMember.userNickname;
    // this.absentMembers = this.props.otherMembers.filter((member) => {
    //   if (member.userNickname == this.props.local.nickname) {
    //     // console.log("이 멤버는 나임");
    //     return false;
    //   }
    //   var remoteFilter = this.props.remote.filter((other) => other.nickname == member.userNickname);
    //   var flag = true;
    //   remoteFilter.forEach((element) => {
    //     console.log("element" + element);
    //     flag = false;
    //   });
    //   return flag;
    // });
    // member.userNickname != this.props.local.nickname &&
    // this.props.remote.filter((other) => other.nickname == member.userNickname).size() > 0
    // console.log("안해??");
    // console.log(this.absentMembers);
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
    // console.log(this.local);
    // console.log(this.remotes);
    // console.log("들어감?");
    // console.log(this.props.hostMember[0].userNickname);
    // var findOtherMembers = this.props.otherMembers.filter((member) => {
    //   if (member.userNickname == this.props.local.nickname) {
    //     // console.log("이 멤버는 나임");
    //     return false;
    //   }
    //   var remoteFilter = [];

    //   remoteFilter = this.props.remote.filter((other) => other.nickname == member.userNickname);
    //   var flag = true;
    //   remoteFilter.forEach((element) => {
    //     // console.log("element" + element);
    //     flag = false;
    //   });
    //   return flag;
    // });
    // absentMembers = findOtherMembers;
    // console.log("remote");
    // console.log(this.props.remote);
    // console.log("absent");
    // console.log(absentMembers);
    // // this.setState({ absentMembers: findOtherMembers });
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

              {this.local.nickname && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 640 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M528 448H112C103.2 448 96 455.2 96 464V496C96 504.8 103.2 512 112 512H528C536.8 512 544 504.8 544 496V464C544 455.2 536.8 448 528 448ZM592 128C565.5 128 544 149.5 544 176C544 183.1 545.6 189.7 548.4 195.8L476 239.2C460.6 248.4 440.7 243.2 431.8 227.6L350.3 85C361 76.2 368 63 368 48C368 21.5 346.5 0 320 0C293.5 0 272 21.5 272 48C272 63 279 76.2 289.7 85L208.2 227.6C199.3 243.2 179.3 248.4 164 239.2L91.7 195.8C94.4 189.8 96.1 183.1 96.1 176C96.1 149.5 74.6 128 48.1 128C21.6 128 0 149.5 0 176C0 202.5 21.5 224 48 224C50.6 224 53.2 223.6 55.7 223.2L128 416H512L584.3 223.2C586.8 223.6 589.4 224 592 224C618.5 224 640 202.5 640 176C640 149.5 618.5 128 592 128Z"
                    fill="#F2C831"
                  />
                </svg>
              )}
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
            {this.props.remote &&
              this.props.remote.map((sub, i) => (
                <UserStatus
                  // hostNickname={this.props.hostMember.userNickname}
                  subscribersMuteStatusChanged={this.subscribersMuteStatusChanged}
                  subscribersCamStatusChanged={this.subscribersCamStatusChanged}
                  user={sub}
                  index={i}
                  isHost={this.isHost}
                  isRemote={true}
                />
              ))}
            --------
            {/* 접속하지 않은 스터디원 목록
            {this.props.otherMembers &&
              this.props.otherMembers.map((sub, i) => (
                <UserStatus
                  hostNickname={this.props.hostMember[0].userNickname}
                  subscribersMuteStatusChanged={this.subscribersMuteStatusChanged}
                  subscribersCamStatusChanged={this.subscribersCamStatusChanged}
                  user={sub}
                  index={i}
                  isHost={this.isHost}
                  isRemote={false}
                />
              ))} */}
          </div>

          {/* <div onClick={this.consoleUser}>확인</div> */}
        </div>
      </div>
    );
  }
}
export default UserComponent;
