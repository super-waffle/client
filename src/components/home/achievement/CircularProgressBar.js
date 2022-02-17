import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React from "react";

export default function CircularProgressBar(props) {
  //   const percentage = 66;
  return (
    <div className="circular-graph">
      <CircularProgressbar
        value={props.percentage}
        text={`${props.percentage}%`}
        strokeWidth={15}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          // rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "butt",

          // Text size
          textSize: "16px",

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors

          pathColor: "#6667ab",
          textColor: "var(--textColor)",
          trailColor: "var(--bgColor-light)",
          backgroundColor: "#6667ab",
        })}
      />
    </div>
  );
}
