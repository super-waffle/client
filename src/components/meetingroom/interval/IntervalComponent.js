import React, { useEffect, useState } from "react";

function TimeInterval(props) {
  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      props.getSignalTimeString();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return <div></div>;
}

export default TimeInterval;
