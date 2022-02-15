import React, { Component } from "react";
import { MdVideocamOff, MdVideocam, MdMicOff, MdMic } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";

class UserStatus extends Component {
  constructor(props) {
    super(props);
    this.User = {};
    this.isHost = false;
    this.consoleUser = this.consoleUser.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
    this.changeAudio = this.changeAudio.bind(this);
  }
  componentDidUpdate() {
    this.consoleUser();
  }
  consoleUser() {
    this.User = this.props.user;
    this.isHost = this.props.isHost;

    // console.log(this.User);
    // console.log(this.host, '호스트냐');
  }
  changeVideo() {
    this.User.setVideoActive(!this.User.isVideoActive());
  }
  changeAudio() {
    this.User.audioActive = this.User.setAudioActive(!this.User.isAudioActive());
  }
  render() {
    return (
      <div className="user">
        <span className="user-name">{this.User.nickname}</span>
        {/* 비디오 버튼 */}
        <span className="user-video">
          {this.User.videoActive ? (
            <MdVideocam
              onClick={this.changeVideo}
              style={{
                cursor: "pointer",
                color: "#6667AB",
              }}
              size={"1.34rem"}
            />
          ) : (
            <MdVideocamOff
              onClick={this.changeVideo}
              style={{ cursor: "pointer", color: "gray" }}
              size={"1.35rem"}
            />
          )}
        </span>
        {/* 마이크 버튼 */}
        <span className="user-audio">
          {this.User.audioActive ? (
            <MdMic
              onClick={this.changeAudio}
              style={{ cursor: "pointer", color: "#6667AB" }}
              size={"1.34rem"}
            />
          ) : (
            <MdMicOff
              onClick={this.changeAudio}
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
