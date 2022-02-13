import React from "react";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import IconButton from "@material-ui/core/IconButton";
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
      {/* <IconButton color="inherit" className="btn btn-one btn-start" onClick={props.handleStart}>
        
      </IconButton>
      <IconButton
        color="inherit"
        className="btn btn-one btn-start"
        onClick={props.handlePauseResume}
      >
      </IconButton> */}
    </div>
  );
}
