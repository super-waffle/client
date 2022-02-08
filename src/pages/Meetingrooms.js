// import VideoRoomComponent from '../components/meetingroom/VideoRoomComponent'
import { Link } from "react-router-dom";
export default function Meetingrooms() {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Meetingrooms</h2>

      <Link className="menu" to={"/videoRoomComponent"} onClick={"window.location.reload();"}>
       openvidu

      </Link>
      {/* <VideoRoomComponent/> */}
    </main>
  );
}
