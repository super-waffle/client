import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react';

export default function CircularProgressBar(props) {
    const percentage = 66;
    return(
        <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
    );
}