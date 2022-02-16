import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import CircularProgressBar from '../CircularProgressBar';

export default function Myachievement({achieveName, achieveImg}) {
    const percentage = ((1/20)*100).toFixed(0);
   
    const AchieveImg =
    'https://i6a301.p.ssafy.io:8080/images/' + achieveImg;
    
    // console.log(percentage,"퍼센트");
    return(
        <div>
        <img src={AchieveImg} alt="" style={{width:'100px', height:'100px'}}/>
        <div>{achieveName}</div>
        <div>업적도감 달성률</div>
        <CircularProgressBar percentage={percentage}/>
        </div>
    )

}