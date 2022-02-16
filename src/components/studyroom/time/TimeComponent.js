import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import ControlButtons from "./ControlButtons";
import { HiMenu } from "react-icons/hi";

function StopWatch(props) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  // const [timeString, setTimeString] = useState("");
  props.onCreate(time);
  // props.onCreate(timeString);
  // props.onPause(isPaused);
  // props.setTime(time);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setTime((time) => time + 1);
      // console.log(time);
      // props.sendTime(time);
      // setTimeString(timeString);
    }, 1000);
    // if (isActive && isPaused === false) {
    // } else {
    //   clearInterval(interval);
    // }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(true);
  };

  return (
    <div className="study-room-stop-watch">
      {/* <div className="stop-watch-title">
        <HiMenu className="stop-watch-menu" />
        <span className="stop-watch-name">공부시간측정</span>
      </div>
      <div className="enter">
        <span className="enter-title">열람실 착석 </span>
        <span className="enter-time">{props.startTime}</span>
      </div> */}
      <Timer time={time} />
      {/* <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
      /> */}
    </div>
  );
}

export default StopWatch;
