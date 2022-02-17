import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import { Divider } from '@material-ui/core';
import './MeetingroomVideo.css';
import { Link, useParams } from 'react-router-dom';

import isLogin from '../../utils/isLogin';
import TimeComponent from './time/TimeComponent';
import UserModel from '../../models/user-model';

export default function MeetingroomVideo(props) {
  const token = localStorage.getItem('accessToken'); //로그인 토큰
  const { meetingSeq } = useParams();
  const [postData, setPostData] = useState([]);
  const [nickname, setNickname] = useState('');
  const [session, setSession] = useState(undefined);
  const [OV, setOV] = useState(new OpenVidu());
  const [localUser, setLocalUser] = useState(new UserModel());

  useEffect(() => {
    createToken();
    console.log('meet: ' + meetingSeq);
    console.log('token: ' + token);
  }, []);

  const setTime = (time) => {
    const timer = time;
    console.log(timer);
  };

  const connectToSession = async () => {
    if (postData.sessionToken !== undefined) {
      await connect(postData.sessionToken);
    } else {
      await getToken()
        .then((token) => {
          console.log(token);
          connect(token);
        })
        .catch((error) => {
          if (props.error) {
            props.error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            });
          }
          console.log('There was an error getting the token:', error.code, error.message);
          alert('There was an error getting the token:', error.message);
        });
    }
  };

  const connect = async (token) => {
    await setSession
      .connect(token, { clientData: nickname })
      .then(() => {
        connectWebCam();
      })
      .catch((error) => {
        if (props.error) {
          props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert('There was an error connecting to the session:', error.message);
        console.log('There was an error connecting to the session:', error.code, error.message);
      });
  };

  const connectWebCam = async () => {
    var devices = await OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === 'videoinput');

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
    localUser.setConnectionId(this.state.session.connection.connectionId);
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
        this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
          this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove('custom-class');
        });
      }
    );
  };

  const getToken = async () => {
    const getToken = await this.createToken(this.state.mySessionId);
    return getToken;
  };

  const createToken = async () => {
    await axios
      .all([
        axios.post(
          process.env.REACT_APP_SERVER_URL + `/meetings/${meetingSeq}/room`,
          {},
          {
            // .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
          }
        ),
        axios.get(process.env.REACT_APP_SERVER_URL + '/users', {
          // .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }),
      ])

      .then(
        axios.spread((resPost, resGet) => {
          setPostData(resPost.data);
          setNickname(resGet.data.user.userNickname);
          console.log('res1: ', postData);
          console.log('res2: ', nickname);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="timeCom">
      <TimeComponent onCreate={setTime} />
    </div>
  );
}
