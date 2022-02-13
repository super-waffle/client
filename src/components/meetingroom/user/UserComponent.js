import React, { Component } from 'react';
import { MdVideocamOff, MdVideocam, MdMicOff, MdMic } from 'react-icons/md';
import './UserComponent.css';
import { Container } from 'react-bootstrap';
import UserStatus from './UserStatus';

class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.local = {};
    this.remotes = [];
    this.session=undefined;
    this.consoleUser = this.consoleUser.bind(this);
  }
  componentDidUpdate() {
    this.consoleUser();
  }
  consoleUser() {
    this.local = this.props.local;
    this.remotes = this.props.remote;
    this.session = this.props.session;
    console.log(this.local);
    console.log(this.remotes);
  }

  render() {
    return (
      <Container className="box">
        <div onClick={this.consoleUser}>확인</div>

        {/* 로컬유저 목록 */}
        <div style={{ alignItems: 'center', display: 'flex' }}>
          {/* 로컬유저 닉네임 */}
          {this.local !== undefined && this.local.nickname !== undefined && (
            <span style={{ marginRight: '1rem', fontSize: '1.2rem' }}>
              {this.local.nickname}
            </span>
          )}
          {/* 로컬유저 마이크, 카메라 상태*/}
          {this.local !== undefined && this.local.nickname !== undefined && (
            <div>
              {/* 비디오 버튼 */}
              <span>
                {this.local.videoActive ? (
                  <MdVideocam style={{ color: '#6667AB' }} size={'1.3rem'} />
                ) : (
                  <MdVideocamOff style={{ color: 'gray' }} size={'1.2rem'} />
                )}
              </span>
              {/* 마이크 버튼 */}
              <span>
                {this.local.audioActive ? (
                  <MdMic style={{ color: '#6667AB' }} size={'1.3rem'} />
                ) : (
                  <MdMicOff style={{ color: 'gray' }} size={'1.2rem'} />
                )}
              </span>
            </div>
          )}
        </div>

        {/* 리모트유저 목록 */}
        {this.local !== undefined &&
          this.local.nickname !== undefined &&
          this.remotes &&
          this.remotes.map((user, index) => (
            <UserStatus user={user} key={index} isHost={this.local.host}  session={this.session}/>
          ))}
      </Container>
    );
  }
}
export default UserComponent;
// {<div style={{alignItems: "center", display:"flex"}}>
//                 <span style={{marginRight:"1rem", fontSize:"1.2rem"}}>{user.nickname}</span>
//                 <div style={{alignItems: "center", justifyContent: "center", display:"flex", size: "2rem"}}>
//                     {videoActive ? (
//                         <MdVideocam onClick={onToggleVideo} style={{cursor: "pointer", color:"#6667AB"}} size={"1.2rem"}/>
//                         ):(
//                         <MdVideocamOff onClick={onToggleVideo} style={{ padding: 0, cursor: "pointer", color:"gray"}} size={"1.2rem"}/>
//                     )}
//                 </div>

//                 <div style={{alignItems: "center", justifyContent: "center", marginLeft:"0.5rem"}}>
//                     {audioActive ? (
//                         <MdMic onClick={onToggleAudio} style={{ padding: 0, cursor: "pointer", color:"#6667AB", }} size={"1.2rem"}/>
//                         ):(
//                         <MdMicOff onClick={onToggleAudio} style={{ padding: 0, cursor: "pointer", color:"gray"}} size={"1.2rem"}/>
//                     )}
//                 </div>
//             </div>
// function UserComponent(props) {
//   const [local, setLocal] = useState({});
//   const [remotes, setRemotes] = useState([]);

//   const consoleUser = useCallback((props)=>{
//     setLocal(props.local);
//     setRemotes(props.remote);
//     console.log(local);
//     console.log(remotes);
//   },[local, remotes])

//   // useEffect((props)=>{
//   //   setLocal(props.local);
//   //   setRemotes(props.remote);
//   // },[local, remotes])
//   return (
//     <Container className="box">
//       <div onClick={consoleUser}>확인</div>
//       {/* <div>{local.nickname}</div> */}
//         {/* {users&&users.map((user, index)=>(
//             <UserStatus user={user} key={index}/>
//         ))} */}
//     </Container>
//   );
// }

// export default UserComponent;

// const users = [
//   {
//     nickname: "js1",
//     audioActive: false,
//     videoActive: false,
//   },
//   {
//     nickname: "tom2",
//     audioActive: true,
//     videoActive: true,
//   },

//   {
//     nickname: "fs3",
//     audioActive: false,
//     videoActive: false,
//   },
//   {
//     nickname: "js4",
//     audioActive: false,
//     videoActive: false,
//   },
//   {
//     nickname: "js5",
//     audioActive: false,
//     videoActive: false,
//   },
//   {
//     nickname: "js6",
//     audioActive: false,
//     videoActive: false,
//   },
//   {
//     nickname: "js7",
//     audioActive: false,
//     videoActive: false,
//   },
//   {
//     nickname: "js8",
//     audioActive: false,
//     videoActive: false,
//   },
//   {
//     nickname: "js9",
//     audioActive: false,
//     videoActive: false,
//   },
//   {
//     nickname: "js10",
//     audioActive: false,
//     videoActive: false,
//   },
//   {
//     nickname: "js11",
//     audioActive: false,
//     videoActive: false,
//   },
//   {
//     nickname: "js12",
//     audioActive: false,
//     videoActive: false,
//   },
// ];
