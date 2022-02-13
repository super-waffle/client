import React from "react";
import "./ControlButtons.css";
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'
import IconButton from '@material-ui/core/IconButton';
export default function ControlButtons(props) {
  return (
    <div className="Control-Buttons">
      <IconButton color="inherit" className="btn btn-one btn-start" onClick={props.handleStart}>
        {props.isPaused ? <PlayArrow className="buttonDisable" /> : <PlayArrow className="buttonColor"/>}
       </IconButton>
      <IconButton color="inherit" className="btn btn-one btn-start" onClick={props.handlePauseResume}>
        {props.isPaused ? <Pause className="buttonColor" /> : <Pause className="buttonDisable"/>}
      </IconButton>
    </div>
  );
}