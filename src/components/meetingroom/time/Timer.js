import React from "react";
import { Component } from "react";

class Timer extends Component {
  render() {
    let hour = ("0" + Math.floor((this.props.time / 3600) % 60)).slice(-2);

    let minute = ("0" + Math.floor((this.props.time / 60) % 60)).slice(-2);

    let second = ("0" + (this.props.time % 60)).slice(-2);

    const timeString = hour + ":" + minute + ":" + second;

    return (
      <div className="timer">
        <span className="digits">{timeString}</span>
      </div>
    );
  }
}
export default Timer;
