import React, { Component, useState } from 'react';
import axios from 'axios';
import './VideoRoomComponent.css';
import { OpenVidu } from 'openvidu-browser';


import StreamComponent from './stream/StreamComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import ChatComponent from './chat/ChatComponent';
import OpenViduLayout from '../../layout/openvidu-layout';
import UserModel from '../../models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';
import TimeComponent from './time/TimeComponent';
import UserComponent from './user/userComponent';

var localUser = new UserModel();

var sessionToken;
var meetingSeq;
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
    this.OPENVIDU_SERVER_URL = 'http://localhost:8080';
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    // let sessionName = this.props.sessionName ? this.props.sessionName : 'SessionA';
    let sessionName = meetingSeq;
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: 'block',
      currentVideoDevice: undefined,
      time: undefined,
      isPaused: undefined,
    };
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged =
      this.camStatusChanged.bind(this);
    this.micStatusChanged =
      this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen =
      this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.closeDialogExtension =
      this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification =
      this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.loginToken = this.loginToken.bind(this);
    this.isHostfun = this.isHostfun.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setPause = this.setPause.bind(this);
    this.userlist = this.userlist.bind(this);
  }
  isHostfun() {
    if (isHost === 0) {
      return false;
    } else if (isHost === 1) {
      return true;
    }
  }
  loginToken() {
    const token = localStorage.getItem('accessToken');
    console.log(token);
  }
  userlist(){
    console.log("local "+ this.localUser)
    console.log("userlist: 유저가 없니이이잉" +this.state.subscribers)
  }
  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };
    // sessionToken = null;
    this.layout.initLayout(
      document.getElementById('layout'),
      openViduLayoutOptions
    );
    window.addEventListener(
      'beforeunload',
      this.onbeforeunload
    );
    window.addEventListener('resize', this.updateLayout);
    window.addEventListener('resize', this.checkSize);
    this.joinSession();
    this.loginToken();
  }

  componentWillUnmount() {
    window.removeEventListener(
      'beforeunload',
      this.onbeforeunload
    );
    window.removeEventListener('resize', this.updateLayout);
    window.removeEventListener('resize', this.checkSize);
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

  async connectWebCam() {
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter(
      (device) => device.kind === 'videoinput'
    );

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
    });

    if (this.state.session.capabilities.publish) {
      publisher.on('accessAllowed', () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.state.nickname);
    localUser.setConnectionId(
      this.state.session.connection.connectionId
    );
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      {
        currentVideoDevice: videoDevices[0],
        localUser: localUser,
      },
      () => {
        this.state.localUser
          .getStreamManager()
          .on('streamPlaying', (e) => {
            this.updateLayout();
            publisher.videos[0].video.parentElement.classList.remove(
              'custom-class'
            );
          });
      }
    );
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive:
              this.state.localUser.isAudioActive(),
            isVideoActive:
              this.state.localUser.isVideoActive(),
            nickname: userName,
            isScreenShareActive:
              this.state.localUser.isScreenShareActive(),
          });
        }
        this.updateLayout();
      }
    );
  }

  setTime(timeCom) {
    this.state.time = timeCom;
  }
  setPause(isPausedCom) {
    this.state.isPaused = isPausedCom;
  }
  leaveSession(sessionId) {
    const mySession = this.state.session;
    
    this.userlist();

    if (mySession) {
      mySession.disconnect();
      // sessionToken = null;
      // this.props.setIsPaused(true);
    }
    if (!this.state.isPaused) {
      console.log(this.state.isPaused);
    }
    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName:
        'OpenVidu_User' + Math.floor(Math.random() * 100),
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
      console.log('sessiontoken  : ', sessionToken);
      const token = localStorage.getItem('accessToken');
      axios
        .delete('/meetings/1/room', {
          data: {
            sessionToken: sessionToken,
            logMeeting: this.state.time / 60, //총공부한시간
            logStartTime: meetingStartTime,
          },

          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Leave', response);
          resolve(response.data.token);
        })
        .catch((error) => {
          console.log('LEAVE ERROR : ' + error);
          reject(error);
        });
    });
    
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser
      .getStreamManager()
      .publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({
      isVideoActive: localUser.isVideoActive(),
    });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser
      .getStreamManager()
      .publishAudio(localUser.isAudioActive());
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
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on('streamCreated', (event) => {
      const subscriber = this.state.session.subscribe(
        event.stream,
        undefined
      );
      // var subscribers = this.state.subscribers;
      subscriber.on('streamPlaying', (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          'custom-class'
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(
        event.stream.connection.connectionId
      );
      newUser.setType('remote');
      const nickname =
        event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on('streamDestroyed', (event) => {
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
    this.state.session.on('signal:userChanged', (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (
          user.getConnectionId() === event.from.connectionId
        ) {
          const data = JSON.parse(event.data);
          console.log('EVENTO REMOTE: ', event.data);
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
            user.setScreenShareActive(
              data.isScreenShareActive
            );
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
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    this.state.session.signal(signalOptions);
  }

  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById('container');
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
      var videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) =>
            device.deviceId !==
            this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(
            undefined,
            {
              audioSource: undefined,
              videoSource: newVideoDevice[0].deviceId,
              publishAudio: localUser.isAudioActive(),
              publishVideo: localUser.isVideoActive(),
              mirror: true,
            }
          );

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(
            this.state.localUser.getStreamManager()
          );
          await this.state.session.publish(newPublisher);
          this.state.localUser.setStreamManager(
            newPublisher
          );
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
    const videoSource =
      navigator.userAgent.indexOf('Firefox') !== -1
        ? 'window'
        : 'screen';
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (
          error &&
          error.name === 'SCREEN_EXTENSION_NOT_INSTALLED'
        ) {
          this.setState({ showExtensionDialog: true });
        } else if (
          error &&
          error.name === 'SCREEN_SHARING_NOT_SUPPORTED'
        ) {
          alert(
            'Your browser does not support screen sharing'
          );
        } else if (
          error &&
          error.name === 'SCREEN_EXTENSION_DISABLED'
        ) {
          alert(
            'You need to enable screen sharing extension'
          );
        } else if (
          error &&
          error.name === 'SCREEN_CAPTURE_DENIED'
        ) {
          alert(
            'You need to choose a window or application to share'
          );
        }
      }
    );

    publisher.once('accessAllowed', () => {
      this.state.session.unpublish(
        localUser.getStreamManager()
      );
      localUser.setStreamManager(publisher);
      this.state.session
        .publish(localUser.getStreamManager())
        .then(() => {
          localUser.setScreenShareActive(true);
          this.setState({ localUser: localUser }, () => {
            this.sendSignalUserChanged({
              isScreenShareActive:
                localUser.isScreenShareActive(),
            });
          });
        });
    });
    publisher.on('streamPlaying', () => {
      this.updateLayout();
      publisher.videos[0].video.parentElement.classList.remove(
        'custom-class'
      );
    });
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  stopScreenShare() {
    this.state.session.unpublish(
      localUser.getStreamManager()
    );
    this.connectWebCam();
  }

  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) =>
        user.isScreenShareActive()
      ) || localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: 'OV_big',
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
      display =
        this.state.chatDisplay === 'none'
          ? 'block'
          : 'none';
    }
    if (display === 'block') {
      this.setState({
        chatDisplay: display,
        messageReceived: false,
      });
    } else {
      console.log('chat', display);
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === 'none',
    });
  }
  checkSize() {
    if (
      document.getElementById('layout').offsetWidth <=
        700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat('none');
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById('layout').offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }

}
export default VideoRoomComponent;
