import React, { Component, useState } from "react";
import axios from "axios";
import "./VideoRoomComponent.css";
import { OpenVidu } from "openvidu-browser";
// import { useSelector } from "react-redux";
import { connect } from "react-redux";

import StreamComponent from "./stream/StreamComponent";
import DialogExtensionComponent from "./dialog-extension/DialogExtension";
import ChatComponent from "./chat/ChatComponent";
import OpenViduLayout from "../../layout/openvidu-layout";
import UserModel from "../../models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent";
import TimeComponent from "./time/TimeComponent";
import UserComponent from "./user/UserComponent";

import "../../statics/css/meetingroom.css";
// import { BsLock } from "react-icons/bs";

// function GetMeetingSeqRedux() {
//   let mtSeq = useSelector((state) => state.meeting.meetingSeq);
//   return mtSeq;
// }

var localUser = new UserModel();

var sessionToken;
// var meetingSeq = GetMeetingSeqRedux();
var meetingSeq = localStorage.getItem("meetingSeq");
var isHost;
var meetingTitle;
var meetingDesc;
var meetingCapacity;
var meetingHeadcount;
var meetingDate;
var meetingStartTime;
var userName;

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    // this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
    //     ? this.props.openviduServerUrl
    //     : 'https://' + window.location.hostname + ':4443';
    // this.meetingSeq = this.props.meetingSeq;
    this.OPENVIDU_SERVER_URL = process.env.REACT_APP_SERVER_URL;
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    // let sessionName = this.props.sessionName ? this.props.sessionName : 'SessionA';
    // let sessionName = meetingSeq;
    this.remotes = [];
    this.localUserAccessAllowed = false;
    console.log("props");
    console.log(props);
    this.state = {
      mySessionId: localStorage.getItem("meetingSeq"), //meetingSeq, //1, //useSelector((state) => state.meeting.meetingSeq), //props.location.state.meetingSeq,
      myUserName: undefined,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "none",
      userlistDisplay: "block",
      currentVideoDevice: undefined,
      time: undefined,
      isPaused: undefined,
      mySessionToken: undefined,
      isHost: false,
      myStartTime: "",
      hour: 0,
      minute: 0,
      second: 0,
      timeString: "00:00:00",
      mutedSound: false,
    };
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.loginToken = this.loginToken.bind(this);
    // this.isHostfun = this.isHostfun.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setPause = this.setPause.bind(this);
    // this.userlist = this.userlist.bind(this);
    this.setTimeString = this.setTimeString.bind(this);
    this.subscribersMuteStatusChanged = this.subscribersMuteStatusChanged.bind(this);
    this.subscribersCamStatusChanged = this.subscribersCamStatusChanged.bind(this);
    this.sendStudyTimeString = this.sendStudyTimeString.bind(this);
    this.getSignalTimeString = this.getSignalTimeString.bind(this);
  }
  // isHostfun() {
  //   console.log(1);
  //   if (isHost === 0) {
  //     return false;
  //   } else if (isHost === 1) {
  //     return true;
  //   }
  // }
  loginToken() {
    // console.log("sessin Id" + this.state.mySessionId);
    const token = localStorage.getItem("accessToken");
    console.log("loginToken: " + token);
  }
  // userlist() {
  //   console.log("local " + this.localUser);
  //   console.log("userlist: 유저가 없니이이잉" + this.state.subscribers);
  // }
  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };
    // sessionToken = null;
    this.layout.initLayoutContainer(document.getElementById("layout"), openViduLayoutOptions);
    window.addEventListener("beforeunload", this.onbeforeunload);
    window.addEventListener("resize", this.updateLayout);
    window.addEventListener("resize", this.checkSize);
    this.loginToken();
    this.joinSession();
    // this.setTime(0);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    window.removeEventListener("resize", this.updateLayout);
    window.removeEventListener("resize", this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();
        this.connectToSession();
      }
    );
  }

  connectToSession() {
    if (sessionToken !== undefined) {
      console.log("connectToSession - token received: ", sessionToken);
      this.connect(sessionToken);
    } else {
      this.getToken()
        .then((token) => {
          console.log("getToken성공 " + token);
          sessionToken = token;
          this.connect(token);
        })
        .catch((error) => {
          if (this.props.error) {
            this.props.error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            });
          }
          console.log("There was an error getting the token:", error.code, error.message);
          alert("There was an error getting the token:", error.message);

          // window.location.reload();
        });
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        console.log("connect 성공 -> session 연결할거");
        console.log("세션아이디!" + this.state.mySessionId);
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log("There was an error connecting to the session:", error.code, error.message);

        // window.location.reload();
      });
  }

  async connectWebCam() {
    // console.log(2);
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });
    this.getSignalTimeString();

    this.setState(
      {
        currentVideoDevice: videoDevices[0],
        localUser: localUser,
      },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          //다른사용자들한테 듣는거같음
          this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove("custom-class");
        });
      }
    );
  }

  updateSubscribers() {
    // console.log(3);
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: userName,
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
            // time:
          });
        }
        this.updateLayout();
      }
    );
  }

  setTime(timeCom) {
    if (timeCom !== this.state.time) {
      // this.setState({ time: timeCom });W
      this.state.time = timeCom;
      // this.props.setTime(() => timeCom);
      // console.log("시간누적: " + this.state.time);
      if (this.state.time > 0) {
        let hour = ("0" + Math.floor((this.state.time / 3600) % 60)).slice(-2);
        let minute = ("0" + Math.floor((this.state.time / 60) % 60)).slice(-2);
        let second = ("0" + (this.state.time % 60)).slice(-2);
        // this.state.timeString = hour + ":" + minute + ":" + second;
        let string = hour + ":" + minute + ":" + second;
        this.setState({ timeString: string });
        // console.log(this.state.timeString);
      }

      this.sendStudyTimeString();
    }
  }

  sendStudyTimeString() {
    if (localUser && this.state.timeString) {
      let studyTimeString = this.state.timeString;
      // let message = this.state.message.replace(/ +(?= )/g, "");
      if (studyTimeString != "00:00:00") {
        const data = {
          studyTimeString: studyTimeString,
          nickname: this.state.localUser.getNickname(),
          streamId: this.state.localUser.getStreamManager().stream.streamId,
        };
        this.state.session.signal({
          data: JSON.stringify(data),
          type: "timeString",
        });
        // console.log("시간보내기 " + this.state.timeString);
      }
    }
  }

  setPause(isPausedCom) {
    // this.setState({ isPaused: isPausedCom });
    this.state.isPaused = isPausedCom;
  }
  setTimeString(timeStringCom) {
    this.state.timeString = timeStringCom;
  }

  leaveSession(sessionId) {
    const mySession = this.state.session;

    // this.userlist();

    if (mySession) {
      mySession.disconnect();
      // sessionToken = null;
      // this.props.setIsPaused(true);
    }
    if (!this.state.isPaused) {
      console.log("!state.isPaused " + this.state.isPaused);
    }
    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: undefined,
      myUserName: "OpenVidu_User" + Math.floor(Math.random() * 100),
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }

    return new Promise((resolve, reject) => {
      // var data = JSON.stringify({
      //     sessionToken: sessionToken,
      //     logMeeting: '40',
      //     logStartTime: '06:58:40'
      // });
      console.log("leave session! sessiontoken  : ", sessionToken);
      // console.log("시간", this.state.time);
      const token = localStorage.getItem("accessToken");
      axios
        .delete(process.env.REACT_APP_SERVER_URL + `/meetings/${this.state.mySessionId}/room`, {
          data: {
            sessionToken: sessionToken,
            logMeeting: this.state.time / 60, //총공부한시간
            logStartTime: meetingStartTime,
          },

          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.statusCode == 200) {
            console.log("Leave 성공: ", response);
            resolve(response.data.token);
            sessionToken = undefined;
          } else {
            console.log("error" + response.data.statusCode);
          }
        })
        .catch((error) => {
          console.log("LEAVE ERROR : " + error);
          reject(error);
        });
    });
  }
  camStatusChanged() {
    // console.log(4);
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({
      isVideoActive: localUser.isVideoActive(),
    });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    // console.log(5);
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({
      isAudioActive: localUser.isAudioActive(),
    });
    this.setState({ localUser: localUser });
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    });
  }

  deleteSubscriber(stream) {
    // console.log(6);
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    // console.log(7);
    // console.log("subscribeToStreamCreated");
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove("custom-class");
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // console.log(8);
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    // console.log(9);
    this.state.session.on("signal:userChanged", (event) => {
      // console.log("여긴가?");
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen()
      );
    });
  }

  updateLayout() {
    // console.log(10);
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    // console.log(11);
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  toggleFullscreen() {
    // console.log(this.state.subscribers);
    const document = window.document;
    const fs = document.getElementById("container");
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.localUser.getStreamManager());
          await this.state.session.publish(newPublisher);
          this.state.localUser.setStreamManager(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  screenShare() {
    const videoSource = navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
          alert("Your browser does not support screen sharing");
        } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
          alert("You need to enable screen sharing extension");
        } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
          alert("You need to choose a window or application to share");
        }
      }
    );

    publisher.once("accessAllowed", () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });
    publisher.on("streamPlaying", () => {
      this.updateLayout();
      publisher.videos[0].video.parentElement.classList.remove("custom-class");
    });
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager());
    this.connectWebCam();
  }

  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: "OV_big",
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    this.layout.setLayoutOptions(openviduLayoutOptions);
    this.updateLayout();
  }

  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({
        chatDisplay: display,
        userlistDisplay: "none",
        messageReceived: false,
      });
    } else {
      // console.log("chat", display);
      this.setState({ chatDisplay: display, userlistDisplay: "block" });
    }
    this.updateLayout();
    // console.log(localUser.getNickname());
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    });
  }
  checkSize() {
    if (document.getElementById("layout").offsetWidth <= 700 && !this.hasBeenUpdated) {
      this.toggleChat("none");
      this.hasBeenUpdated = true;
    }
    if (document.getElementById("layout").offsetWidth > 700 && this.hasBeenUpdated) {
      this.hasBeenUpdated = false;
    }
  }

  subscribersMuteStatusChanged(key, status) {
    // console.log("subscriber 값 변경");
    // console.log(remotes);
    const remoteUsers = this.state.subscribers.map((sub) => sub);
    // console.log(remoteUsers);
    // console.log(key + " " + status);
    remoteUsers[key].setIsMuted(status);
    this.setState({ subscribers: remoteUsers });
    // console.log(this.state.subscribers[key]);
  }

  subscribersCamStatusChanged(key, status) {
    console.log("video subscriber 값 변경");
    // console.log(remotes);
    const remoteUsers = this.state.subscribers.map((sub) => sub);
    // console.log(remoteUsers);
    // console.log(key + " " + status);
    remoteUsers[key].setIsBlocked(status);
    remoteUsers[key].setVideoActive(!status);
    this.setState({ subscribers: remoteUsers });
    // console.log("원격스트림");
    // console.log(this.state.subscribers[key]);
    // console.log(localUser);
    // localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    remoteUsers[key].getStreamManager().subscribeToVideo(!status);
  }

  getSignalTimeString() {
    // console.log("들어오는지..");
    localUser.getStreamManager().stream.session.on("signal:timeString", (event) => {
      // console.log("ㅠㅠ");
      const data = JSON.parse(event.data);
      const remoteUsers = this.state.subscribers;
      remoteUsers.forEach((remote) => {
        if (remote.getNickname() == data.nickname) {
          remote.setStudyTimeString(data.studyTimeString);
        }
      });
      this.setState({ subscribers: remoteUsers });
    });
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   //componentDidUpdate가 props의 변과를 감지한다
  //   console.log("********************************");
  //   // console.log("비교" + this.props.timeString + " " + prevProps.timeString);
  //   if (this.props.timeString !== prevProps.timeString) {
  //     //하위컴포넌트가 받은 props값 적어주기(둘다)
  //     console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
  //   }
  // };

  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    // console.log("로컬유저 들어오나?");
    // console.log(localUser);
    var chatDisplay = { display: this.state.chatDisplay };
    var userlistDisplay = { display: this.state.userlistDisplay };

    // console.log("localStorage" + localStorage.getItem("meetingSeq"));
    return (
      <div className="meeting-room">
        <div className="meeting-room-content">
          <DialogExtensionComponent
            showDialog={this.state.showExtensionDialog}
            cancelClicked={this.closeDialogExtension}
          />

          {/* <IntervalComponent getSignalTimeString={this.getSignalTimeString} /> */}
          <div id="layout" className="meeting-room-video">
            {/* publisher */}
            {localUser !== undefined && localUser.getStreamManager() !== undefined && (
              <div className="OT_root OT_publisher custom-class" id="localUser">
                <StreamComponent
                  timeString={this.state.timeString}
                  cumTime={this.state.time}
                  user={localUser}
                  handleNickname={this.nicknameChanged}
                />
              </div>
            )}
            {/* !host */}
            {this.state.subscribers.map((sub, i) => (
              <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                <StreamComponent
                  timeString={sub.getStudyTimeString()}
                  cumTime={this.state.time}
                  user={sub}
                  streamId={sub.streamManager.stream.streamId}
                />
              </div>
            ))}
          </div>

          <div className="meeting-room-sidebar">
            <div className="meeting-room-timer">
              <TimeComponent
                // cumTime={this.state.time}
                startTime={this.state.myStartTime}
                // sendTime={this.setTime}
                onCreate={this.setTime}
                // onClick={() => {
                //   this.setTime();
                //   this.setTimeString();
                // }}
              />
            </div>
            {localUser !== undefined && localUser.getStreamManager() !== undefined && (
              <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
                <div className="meeting-room-chat">
                  <ChatComponent
                    user={localUser}
                    chatDisplay={this.state.chatDisplay}
                    close={this.toggleChat}
                    messageReceived={this.checkNotification}
                  />
                </div>
              </div>
            )}

            {localUser !== undefined && localUser.getStreamManager() !== undefined && (
              <div className="OT_root OT_publisher custom-class" style={userlistDisplay}>
                <div className="meeting-room-userlist">
                  <UserComponent
                    subscribersCamStatusChanged={this.subscribersCamStatusChanged}
                    subscribersMuteStatusChanged={this.subscribersMuteStatusChanged}
                    local={localUser}
                    isHost={this.state.isHost}
                    remote={this.state.subscribers}
                    camStatusChanged={this.camStatusChanged}
                    micStatusChanged={this.micStatusChanged}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="meeting-room-buttons" id="video-button-footer">
          <ToolbarComponent
            sessionId={mySessionId}
            user={localUser}
            showNotification={this.state.messageReceived}
            camStatusChanged={this.camStatusChanged}
            micStatusChanged={this.micStatusChanged}
            screenShare={this.screenShare}
            stopScreenShare={this.stopScreenShare}
            toggleFullscreen={this.toggleFullscreen}
            switchCamera={this.switchCamera}
            leaveSession={this.leaveSession}
            toggleChat={this.toggleChat}
          />
        </div>
      </div>
    );
  }
  // render() {
  //   const mySessionId = this.state.mySessionId;
  //   const localUser = this.state.localUser;
  //   var chatDisplay = { display: this.state.chatDisplay };

  //   return (
  //     <div
  //       className="container"
  //       id="container"
  //       onMouseOver={this.sendTime}
  //     >
  //       <DialogExtensionComponent
  //         showDialog={this.state.showExtensionDialog}
  //         cancelClicked={this.closeDialogExtension}
  //       />

  //       <div id="layout" className="bounds">
  //         <div className="left">
  //           {localUser !== undefined &&
  //             localUser.getStreamManager() !==
  //               undefined && (
  //               <div
  //                 className="OT_root OT_publisher custom-class"
  //                 id="localUser"
  //               >
  //                 <StreamComponent
  //                   user={localUser}
  //                   handleNickname={this.nicknameChanged}
  //                 />
  //               </div>
  //             )}
  //           {this.state.subscribers.map((sub, i) => (
  //             <div
  //               key={i}
  //               className="OT_root OT_publisher custom-class"
  //               id="remoteUsers"
  //             >
  //               <StreamComponent
  //                 user={sub}
  //                 streamId={
  //                   sub.streamManager.stream.streamId
  //                 }
  //               />
  //             </div>
  //           ))}
  //           <ToolbarComponent
  //             sessionId={mySessionId}
  //             user={localUser}
  //             showNotification={this.state.messageReceived}
  //             camStatusChanged={this.camStatusChanged}
  //             micStatusChanged={this.micStatusChanged}
  //             screenShare={this.screenShare}
  //             stopScreenShare={this.stopScreenShare}
  //             toggleFullscreen={this.toggleFullscreen}
  //             switchCamera={this.switchCamera}
  //             leaveSession={this.leaveSession}
  //             toggleChat={this.toggleChat}
  //           />
  //         </div>
  //         <div className="right">
  //           <TimeComponent
  //             onCreate={this.setTime}
  //             onPause={this.setPause}
  //           />
  //           <UserComponent />
  //           {localUser !== undefined &&
  //             localUser.getStreamManager() !==
  //               undefined && (
  //               <div style={chatDisplay}>
  //                 <ChatComponent
  //                   user={localUser}
  //                   chatDisplay={this.state.chatDisplay}
  //                   // close={this.toggleChat}
  //                   messageReceived={this.checkNotification}
  //                 />
  //               </div>
  //             )}
  //         </div>
  //       </div>
  //       <div className="toolBar"></div>
  //     </div>
  //   );
  // }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  async getToken() {
    const getToken = await this.createToken();
    return getToken;
  }

  createToken() {
    return new Promise((resolve, reject) => {
      // var data = JSON.stringify({});
      const token = localStorage.getItem("accessToken");
      axios
        .post(
          process.env.REACT_APP_SERVER_URL + `/meetings/${this.state.mySessionId}/room`,
          {},
          {
            // .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("응답", res);
          switch (res.data.statusCode) {
            case 404:
              //미팅룸 시퀀스가 유효하지 않음 (존재하지 않는 미팅룸)
              console.log("404");
              break;
            case 405:
              console.log("405");
              //미팅룸 정원초과
              break;
            case 407:
              console.log("407");
              //블랙리스트
              break;
            case 409:
              console.log("409");
              //서버에러
              window.location.reload();
              break;
          }
          resolve(res.data.sessionToken);
          this.sessionToken = res.data.sessionToken;
          this.meetingSeq = res.data.meetingSeq;
          this.isHost = res.data.isHost;
          this.meetingTitle = res.data.meetingTitle;
          this.meetingDesc = res.data.meetingDesc;
          this.meetingCapacity = res.data.meetingCapacity;
          this.meetingHeadcount = res.data.meetingHeadcount;
          this.meetingDate = res.data.meetingDate;
          this.meetingStartTime = res.data.meetingStartTime; //미팅스타트타임

          this.userName = res.data.userNickname;
          console.log("Nickname : " + this.userName);
          console.log("meetingSeq : " + this.meetingSeq);
          console.log("sessionToken: " + this.sessionToken);
          this.setState({
            mySessionId: res.data.meetingUrl,
            myUserName: res.data.userNickname,
            time: 0,
            mySessionToken: res.data.sessionToken,
            isHost: res.data.isHost,
            myStartTime: res.data.meetingStartTime.split(".")[0],
          });
          console.log("state 변수");
          console.log(this.state);
        });
      // axios
      //   .all([
      //     axios.post(process.env.REACT_APP_SERVER_URL + `/meetings/1/room`, data, {
      //       // .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
      //       headers: {
      //         Authorization: "Bearer " + token,
      //         "Content-Type": "application/json",
      //       },
      //     }),
      //     axios.get(process.env.REACT_APP_SERVER_URL + "/users", {
      //       // .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
      //       headers: {
      //         Authorization: "Bearer " + token,
      //         "Content-Type": "application/json",
      //       },
      //     }),
      //   ])

      //   .then(
      //     axios.spread((response1, response2) => {
      //       console.log("TOKEN", response1);
      //       resolve(response1.data.sessionToken);
      //       sessionToken = response1.data.sessionToken;
      //       meetingSeq = response1.data.meetingSeq;
      //       isHost = response1.data.isHost;

      //       meetingTitle = response1.data.meetingTitle;
      //       meetingDesc = response1.data.meetingDesc;
      //       meetingCapacity = response1.data.meetingCapacity;
      //       meetingHeadcount = response1.data.meetingHeadcount;
      //       meetingDate = response1.data.meetingDate;
      //       meetingStartTime = response1.data.meetingStartTime; //미팅스타트타임

      //       this.userName = response2.data.user.userNickname;
      //       console.log("Nickname : " + this.userName);
      //       console.log("meetingSeq : " + this.meetingSeq);
      //       console.log("sessionToken: " + sessionToken);
      //     })
      //   )
      //   .catch((error) => reject(error));
    });
  }
}
export default VideoRoomComponent;
