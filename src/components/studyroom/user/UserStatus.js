import React, { Component } from "react";
import { MdVideocamOff, MdVideocam, MdMicOff, MdMic } from "react-icons/md";

class UserStatus extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.isHost = this.props.isHost;
    this.index = this.props.index;
    this.changeVideo = this.changeVideo.bind(this);
    this.changeAudio = this.changeAudio.bind(this);
    this.subscribersMuteStatusChanged = this.subscribersMuteStatusChanged.bind(this);
    this.subscribersMuteStatusChangedByHost = this.subscribersMuteStatusChangedByHost.bind(this);
    this.subscribersMute = this.subscribersMute.bind(this);
    this.subscribersCamStatusChanged = this.subscribersCamStatusChanged.bind(this);
    this.subscribersCamStatusChangedByHost = this.subscribersCamStatusChangedByHost.bind(this);
    this.subscribersCam = this.subscribersCam.bind(this);
  }
  changeVideo(status) {
    this.user.videoActive = status;
    this.user.setVideoActive(status);
  }
  changeAudio(status) {
    this.user.audioActive = status;
    this.user.setAudioActive(status);
  }
  subscribersMuteStatusChanged(key, status) {
    this.props.subscribersMuteStatusChanged(key, status, this.user.nickname);
  }
  subscribersMuteStatusChangedByHost(key, status) {}
  subscribersMute(key, status) {
    this.changeAudio(!status);
    this.subscribersMuteStatusChanged(this.index, status);
  }
  subscribersCamStatusChanged(key, status) {
    this.props.subscribersCamStatusChanged(key, status, this.user.nickname);
  }
  subscribersCamStatusChangedByHost(key, status) {}
  subscribersCam(key, status) {
    this.changeVideo(!status);
    this.subscribersCamStatusChanged(this.index, status);
  }
  render() {
    return (
      <div className="user">
        {this.props.isRemote ? (
          <div>
            <div className="user-attend">
              {this.props.user.isLate ? (
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
            <span className="user-name">{this.props.user.nickname}</span>
            {/* 비디오 버튼 */}
            <span className="user-video">
              {this.user.videoActive ? (
                <MdVideocam
                  onClick={() => {
                    this.subscribersCam(this.key, this.props.user.videoActive);
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
                    this.subscribersCam(this.key, this.props.user.videoActive);
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
                    this.subscribersMute(this.key, this.props.user.audioActive);
                  }}
                  style={{ cursor: "pointer", color: "#6667AB" }}
                  size={"1.34rem"}
                />
              ) : (
                <MdMicOff
                  onClick={() => {
                    this.subscribersMute(this.key, this.props.user.audioActive);
                  }}
                  style={{ cursor: "pointer", color: "gray" }}
                  size={"1.35rem"}
                />
              )}
            </span>
            {this.props.hostNickname == this.props.user.nickname && (
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
        ) : (
          <div>
            <div className="user-attend">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.578 9.165C17.578 11.5957 16.652 13.9269 15.0038 15.6456C13.3555 17.3644 11.12 18.33 8.789 18.33C6.45801 18.33 4.2225 17.3644 2.57424 15.6456C0.925981 13.9269 0 11.5957 0 9.165C0 6.73429 0.925981 4.40314 2.57424 2.68437C4.2225 0.965596 6.45801 0 8.789 0C11.12 0 13.3555 0.965596 15.0038 2.68437C16.652 4.40314 17.578 6.73429 17.578 9.165ZM6.03804 6.91156H6.94441C7.09602 6.91156 7.21687 6.7821 7.23664 6.62515C7.33552 5.87362 7.8299 5.32601 8.711 5.32601C9.46465 5.32601 10.1546 5.71896 10.1546 6.6641C10.1546 7.39157 9.74371 7.7261 9.09442 8.23475C8.35504 8.79496 7.76948 9.44912 7.81122 10.5111L7.81452 10.7597C7.81567 10.8349 7.84512 10.9066 7.8965 10.9593C7.94789 11.012 8.01709 11.0415 8.08918 11.0415H8.98016C9.053 11.0415 9.12286 11.0114 9.17437 10.9576C9.22588 10.9039 9.25482 10.8311 9.25482 10.7551V10.6348C9.25482 9.81228 9.55474 9.57284 10.3644 8.93244C11.0335 8.40201 11.7311 7.81316 11.7311 6.57703C11.7311 4.84599 10.3293 4.00969 8.79449 4.00969C7.40254 4.00969 5.87764 4.68561 5.77327 6.62859C5.77177 6.66558 5.77754 6.70251 5.79023 6.7371C5.80292 6.77168 5.82225 6.8032 5.84705 6.8297C5.87185 6.8562 5.90159 6.87714 5.93443 6.89122C5.96728 6.90529 6.00254 6.91221 6.03804 6.91156ZM8.59235 14.2928C9.26251 14.2928 9.72283 13.8414 9.72283 13.2308C9.72283 12.5984 9.26141 12.1539 8.59235 12.1539C7.95075 12.1539 7.48383 12.5984 7.48383 13.2308C7.48383 13.8414 7.95075 14.2928 8.59344 14.2928H8.59235Z"
                  fill="#ABABAB"
                />
              </svg>
            </div>

            <span className="user-name">{this.props.user.userNickname}</span>
            {/* 비디오 버튼 */}
            <span className="user-video">
              <MdVideocamOff style={{ cursor: "pointer", color: "gray" }} size={"1.35rem"} />
            </span>
            {/* 마이크 버튼 */}
            <span className="user-audio">
              <MdMicOff style={{ cursor: "pointer", color: "gray" }} size={"1.35rem"} />
            </span>

            {this.props.hostNickname == this.props.user.userNickname && (
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
        )}
      </div>
    );
  }
}
export default UserStatus;
