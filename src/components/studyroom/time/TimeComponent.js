import React, { useEffect, useState } from "react";
import Timer from "./Timer";

function StopWatch(props) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  props.onCreate(time);

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
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
      <Timer time={time} />
    </div>
  );
}

export default StopWatch;
