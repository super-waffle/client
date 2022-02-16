class UserModel {
  connectionId;
  audioActive;
  videoActive;
  screenShareActive;
  nickname;
  streamManager;
  type; // 'remote' | 'local'
  isHost;
  isMuted;
  isBlocked;
  isLate;
  studyTimeString;

  constructor() {
    this.connectionId = "";
    this.audioActive = false;
    this.videoActive = false;
    this.screenShareActive = false;
    this.nickname = "";
    this.streamManager = null;
    this.type = "local";
    this.isHost = false;
    this.isMuted = false;
    this.studyTimeString = "00:00:00";
    this.isLate = false;
  }

  isAudioActive() {
    return this.audioActive;
  }

  isVideoActive() {
    return this.videoActive;
  }

  isScreenShareActive() {
    return this.screenShareActive;
  }

  getConnectionId() {
    return this.connectionId;
  }

  getNickname() {
    return this.nickname;
  }

  getIsMuted() {
    return this.isMuted;
  }

  getIsBlocked() {
    return this.isBlocked;
  }

  getStudyTimeString() {
    return this.studyTimeString;
  }

  getStreamManager() {
    return this.streamManager;
  }
  getIsHost() {
    return true;
  }
  isLocal() {
    return this.type === "local";
  }
  isRemote() {
    return !this.isLocal();
  }
  getIsLate() {
    return this.isLate;
  }
  setAudioActive(isAudioActive) {
    this.audioActive = isAudioActive;
  }
  setVideoActive(isVideoActive) {
    this.videoActive = isVideoActive;
  }
  setScreenShareActive(isScreenShareActive) {
    this.screenShareActive = isScreenShareActive;
  }
  setStreamManager(streamManager) {
    this.streamManager = streamManager;
  }

  setConnectionId(conecctionId) {
    this.connectionId = conecctionId;
  }
  setNickname(nickname) {
    this.nickname = nickname;
  }
  setIsHost(isHost) {
    this.host = isHost;
  }
  setType(type) {
    if ((type === "local") | (type === "remote")) {
      this.type = type;
    }
  }

  setIsMuted(isMuted) {
    this.isMuted = isMuted;
  }

  setIsBlocked(isBlocked) {
    this.isBlocked = isBlocked;
  }

  setStudyTimeString(timeString) {
    this.studyTimeString = timeString;
  }
  setIsLate(isLate) {
    this.isLate = isLate;
  }
}

export default UserModel;
