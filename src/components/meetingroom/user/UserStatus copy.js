import React from "react";
import { MdVideocamOff, MdVideocam, MdMicOff, MdMic } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

function UserStatus({ user }) {
    const [audioActive,setAudioActive] = useState(user.audioActive);
    const [videoActive,setVideoActive] = useState(user.videoActive);
    const User = user;
    const onToggleVideo = ()=>{
        setVideoActive((current)=>!current)
        console.log(User);
    }
    const onToggleAudio = ()=>{
        setAudioActive((current)=>!current)
    }
    

  return (
      <Row >
            <div style={{alignItems: "center", display:"flex"}}>
                <span style={{marginRight:"1rem", fontSize:"1.2rem"}}>{user.nickname}</span>
                <div style={{alignItems: "center", justifyContent: "center", display:"flex", size: "2rem"}}>
                    {videoActive ? (
                        <MdVideocam onClick={onToggleVideo} style={{cursor: "pointer", color:"#6667AB"}} size={"1.2rem"}/>
                        ):(
                        <MdVideocamOff onClick={onToggleVideo} style={{ padding: 0, cursor: "pointer", color:"gray"}} size={"1.2rem"}/>
                    )}
                </div>
                        
                <div style={{alignItems: "center", justifyContent: "center", marginLeft:"0.5rem"}}>
                    {audioActive ? (
                        <MdMic onClick={onToggleAudio} style={{ padding: 0, cursor: "pointer", color:"#6667AB", }} size={"1.2rem"}/>
                        ):(
                        <MdMicOff onClick={onToggleAudio} style={{ padding: 0, cursor: "pointer", color:"gray"}} size={"1.2rem"}/>
                    )}
                </div>
            </div>
      </Row>
  );
}
export default UserStatus;
