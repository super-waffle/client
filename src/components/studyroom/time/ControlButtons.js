import React from "react";
import { BsTriangleFill } from "react-icons/bs";
import { BsFillPauseFill } from "react-icons/bs";

export default function ControlButtons(props) {
  return (
    <div className="control-buttons">
      <BsTriangleFill
        className={props.isPaused ? "start-button-disable" : "start-button"}
        onClick={props.handleStart}
      />
      <BsFillPauseFill
        className={props.isPaused ? "pause-button" : "pause-button-disable"}
        onClick={props.handlePauseResume}
      />
    </div>
  );
}
