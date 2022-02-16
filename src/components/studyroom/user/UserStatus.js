import React, { Component } from "react";
import { MdVideocamOff, MdVideocam, MdMicOff, MdMic } from "react-icons/md";

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
    console.log("머넘어오냐..");
    console.log(props);
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
    // console.log("이름비교" + this.props.hostNickname + "/" + this.user.userNickname + "/");
    return (
      <div className="user">
        {this.props.isRemote ? (
          <div>
            {/* {this.props.hostNickname == */}
            {this.user.nickname && (
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
        ) : (
          <div>
            {/* {this.props.hostNickname == */}
            {this.user.userNickname && (
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
            <span className="user-name">{this.user.userNickname}</span>
            {/* 비디오 버튼 */}
            <span className="user-video">
              <MdVideocamOff style={{ cursor: "pointer", color: "gray" }} size={"1.35rem"} />
            </span>
            {/* 마이크 버튼 */}
            <span className="user-audio">
              <MdMicOff style={{ cursor: "pointer", color: "gray" }} size={"1.35rem"} />
            </span>
          </div>
        )}
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
