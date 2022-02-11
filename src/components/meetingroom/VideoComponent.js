import React, { Component } from 'react';
// import './App.css';
import axios from 'axios';
import OpenViduSession from 'openvidu-react';


const token = localStorage.getItem('accessToken');
var postData;
var Nickname;
class VideoComponent extends Component {
    constructor(props) {
        super(props);
        this.OPENVIDU_SERVER_URL = 'https://i6a301.p.ssafy.io:8080';
        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
            token: undefined,
        };

        this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
        this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
        this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.joinSession = this.joinSession.bind(this);
    }

    handlerJoinSessionEvent() {
        console.log('Join session');
    }

    handlerLeaveSessionEvent() {
        console.log('Leave session');
        this.setState({
            session: undefined,
        });
    }

    handlerErrorEvent() {
        console.log('Leave session');
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    joinSession(event) {
        if (this.state.mySessionId && this.state.myUserName) {
            this.getToken().then((token) => {
                this.setState({
                    token: token,
                    session: true,
                });
            });
            event.preventDefault();
        }
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const token = this.state.token;
        return (
            <div>
                {this.state.session === undefined ? (
                    <div id="join">
                        <div id="join-dialog">
                            <h1> Join a video session </h1>
                            <form onSubmit={this.joinSession}>
                                <p>
                                    <label>Participant: </label>
                                    <input
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> Session: </label>
                                    <input
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>
                                <p>
                                    <input name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div id="session">
                        <OpenViduSession
                            id="opv-session"
                            sessionName={mySessionId}
                            user={myUserName}
                            token={token}
                            joinSession={this.handlerJoinSessionEvent}
                            leaveSession={this.handlerLeaveSessionEvent}
                            error={this.handlerErrorEvent}
                        />
                    </div>
                )}
            </div>
        );
    }

    async getToken() {
        // return this.createSession(this.state.mySessionId)
        //     .then((sessionId) => this.createToken(sessionId))
        //     .catch((Err) => console.error(Err));
        
     const getToken = await this.createToken(this.state.mySessionId);
     return getToken;

    }

    // createSession(sessionId) {
    //      return new Promise((resolve, reject) => {
    //         var data = JSON.stringify({ customSessionId: sessionId });
    //         axios
    //             .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
    //                 headers: {
    //                     Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
    //                     'Content-Type': 'application/json',
    //                 },
    //             })
    //             .then((response) => {
    //                 console.log('CREATE SESION', response);
    //                 resolve(response.data.id);
    //             })
    //             .catch((response) => {
    //                 var error = Object.assign({}, response);
    //                 if (error.response && error.response.status === 409) {
    //                     resolve(sessionId);
    //                 } else {
    //                     console.log(error);
    //                     console.warn(
    //                         'No connection to OpenVidu Server. This may be a certificate error at ' + this.OPENVIDU_SERVER_URL,
    //                     );
    //                     if (
    //                         window.confirm(
    //                             'No connection to OpenVidu Server. This may be a certificate error at "' +
    //                                 this.OPENVIDU_SERVER_URL +
    //                                 '"\n\nClick OK to navigate and accept it. ' +
    //                                 'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
    //                                 this.OPENVIDU_SERVER_URL +
    //                                 '"',
    //                         )
    //                     ) {
    //                         window.location.assign(this.OPENVIDU_SERVER_URL + '/accept-certificate');
    //                     }
    //                 }
    //             });
    //     });
    // }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({});
            axios
                .all([
                axios.post(this.OPENVIDU_SERVER_URL+'/meetings/1/room', data, {
                    // .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
                    headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    },
                }),
                axios.get(this.OPENVIDU_SERVER_URL+'/users', {
                    // .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
                    headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    },
                }),
                ])
                .then(
                    axios.spread((resPost, resGet) => {
                        postData = resPost.data;
                        Nickname = resGet.data.user.userNickname;
                      
                        resolve(resPost.data.sessionToken);
                      
                        console.log('Nickname : ' + Nickname);
                        console.log('meetingSeq : ' + postData);
                    })
                  )
                .catch((error) => reject(error));
        });
    }
}

export default VideoComponent;
