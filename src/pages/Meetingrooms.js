// import VideoRoomComponent from '../components/meetingroom/VideoRoomComponent'
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import isLogin from "../utils/isLogin";

export default function Meetingrooms() {
  const TOKEN = localStorage.getItem("accessToken");
  // const [category, setCategory] = useState("");
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    if (isLogin) {
      axios
        .get("/meetings?page=1&type=0&key=", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          // console.log(res);
          const data = res.data.data;
          setPostData((prevState) => ({
            ...prevState,
            data,
          }));
        });
    }
  }, []);
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Meetingrooms</h2>

      <Link className="menu" to={"/videoRoomComponent"}>
      {/* onClick={"window.location.reload();"} */}
       openvidu
      </Link>
      <br></br>
      <Link className="menu" to={"/videoRoomComponentCopy"} onClick={"window.location.reload();"}>
      
       copyfile
      </Link>

      <div>
        <table>      
          {postData.data &&
              postData.data.map((post) => (
                <tr>
                  <td>
                    {post.meetingSeq}
                  </td>
                  <td>
                    <div>
                      <Link
                          
                          to={`/meetingrooms/${post.meetingSeq}`}
                        >
                          {post.meetingTitle}
                        </Link>
                    </div>
                    </td>
                </tr>
           ))}
        </table>
      </div>


      {/* <VideoRoomComponent/> */}
    </main>
  );
}
