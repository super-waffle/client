import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react';

export default function CircularProgressBar(props) {
//   const percentage = 66;
  return (
    <div style={{ width: '30%', height: '30%' }}>
      <CircularProgressbar value={props.percentage} text={`${props.percentage}%`} />
    </div>
  );
}
