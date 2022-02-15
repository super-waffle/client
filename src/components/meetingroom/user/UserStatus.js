import React, { Component } from "react";
import { MdVideocamOff, MdVideocam, MdMicOff, MdMic } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";

class UserStatus extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.isHost = this.props.isHost;
    this.index = this.props.index;
    // this.consoleUser = this.consoleUser.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
    this.changeAudio = this.changeAudio.bind(this);
    this.subscribersMuteStatusChanged = this.subscribersMuteStatusChanged.bind(this);
    this.subscribersMuteStatusChangedByHost = this.subscribersMuteStatusChangedByHost.bind(this);
    this.subscribersMute = this.subscribersMute.bind(this);
    this.subscribersCamStatusChanged = this.subscribersCamStatusChanged.bind(this);
    this.subscribersCamStatusChangedByHost = this.subscribersCamStatusChangedByHost.bind(this);
    this.subscribersCam = this.subscribersCam.bind(this);
  }
  // componentDidUpdate() {
  //   this.consoleUser();
  // }
  // consoleUser() {
  //   this.User = this.props.user;
  //   this.isHost = this.props.isHost;

  //   // console.log(this.User);
  //   // console.log(this.host, '호스트냐');
  // }
  changeVideo(status) {
    this.user.videoActive = status;
    this.user.setVideoActive(status);
  }
  changeAudio(status) {
    this.user.audioActive = status;
    this.user.setAudioActive(status);
  }
  subscribersMuteStatusChanged(key, status) {
    // console.log(this.user.audioActive);
    // console.log(this.user.audioActive);
    this.props.subscribersMuteStatusChanged(key, status, this.user.nickname);
  }
  subscribersMuteStatusChangedByHost(key, status) {}
  subscribersMute(key, status) {
    // console.log("오디오 분기함수  " + this.props.index + " " + status);
    // console.log(this.user);
    // console.log(this.isHost);
    // console.log(this.index);
    this.changeAudio(!status);
    this.subscribersMuteStatusChanged(this.index, status);
  }
  subscribersCamStatusChanged(key, status) {
    // console.log(this.user.audioActive);
    // console.log(this.user.audioActive);
    this.props.subscribersCamStatusChanged(key, status, this.user.nickname);
  }
  subscribersCamStatusChangedByHost(key, status) {}
  subscribersCam(key, status) {
    // console.log("비디오 분기함수  " + this.props.index + " " + status);
    // console.log(this.user);
    // console.log(this.isHost);
    // console.log(this.index);
    this.changeVideo(!status);
    this.subscribersCamStatusChanged(this.index, status);
    // if (this.isHost) {
    //   this.subscribersCamStatusChangedByHost(this.index, status);
    // } else {
    //   this.subscribersCamStatusChanged(this.index, status);
    // }
  }
  render() {
    return (
      <div className="user">
        <span className="user-name">{this.user.nickname}</span>
        {/* 비디오 버튼 */}
        <span className="user-video">
          {this.user.videoActive ? (
            <MdVideocam
              onClick={() => {
                this.subscribersCam(this.key, this.user.videoActive);
              }}
              style={{
                cursor: "pointer",
                color: "#6667AB",
              }}
              size={"1.34rem"}
            />
          ) : (
            <MdVideocamOff
              onClick={() => {
                this.subscribersCam(this.key, this.user.videoActive);
              }}
              style={{ cursor: "pointer", color: "gray" }}
              size={"1.35rem"}
            />
          )}
        </span>
        {/* 마이크 버튼 */}
        <span className="user-audio">
          {this.user.audioActive ? (
            <MdMic
              onClick={() => {
                this.subscribersMute(this.key, this.user.audioActive);
              }}
              style={{ cursor: "pointer", color: "#6667AB" }}
              size={"1.34rem"}
            />
          ) : (
            <MdMicOff
              onClick={() => {
                this.subscribersMute(this.key, this.user.audioActive);
              }}
              style={{ cursor: "pointer", color: "gray" }}
              size={"1.35rem"}
            />
          )}
        </span>
      </div>
    );
  }
}
export default UserStatus;

// {this.host ? (
//   // 호스트일때
//   <div className="user">
//     <span className="user-name">{this.User.nickname}</span>
//     {/* 비디오 버튼 */}
//     <span className="user-video">
//       {this.User.videoActive ? (
//         <MdVideocam
//           onClick={this.changeVideo}
//           style={{ cursor: "pointer", color: "#6667AB" }}
//           size={"1.2rem"}
//         />
//       ) : (
//         <MdVideocamOff
//           onClick={this.changeVideo}
//           style={{ cursor: "pointer", color: "gray" }}
//           size={"1.2rem"}
//         />
//       )}
//     </span>
//     {/* 마이크 버튼 */}
//     <span className="user-mic">
//       {this.User.audioActive ? (
//         <MdMic
//           onClick={this.changeAudio}
//           style={{ cursor: "pointer", color: "#6667AB" }}
//           size={"1.2rem"}
//         />
//       ) : (
//         <MdMicOff
//           onClick={this.changeAudio}
//           style={{ cursor: "pointer", color: "gray" }}
//           size={"1.2rem"}
//         />
//       )}
//     </span>
//   </div>
// ) : (
//   // 게스트일때
//   <div className="user">
//     <span className="user">{this.User.nickname}</span>
//     <span>
//       {this.User.videoActive ? (
//         <MdVideocam style={{ color: "#6667AB" }} size={"1.2rem"} />
//       ) : (
//         <MdVideocamOff style={{ color: "gray" }} size={"1.2rem"} />
//       )}
//     </span>
//     <span>
//       {this.User.audioActive ? (
//         <MdMic style={{ color: "#6667AB" }} size={"1.2rem"} />
//       ) : (
//         <MdMicOff style={{ color: "gray" }} size={"1.2rem"} />
//       )}
//     </span>
//   </div>
// )}
