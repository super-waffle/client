import { Link } from "react-router-dom";
export default function Meetingrooms() {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Meetingrooms</h2>
      <Link to={"/videoComponent"}>
        오픈비두
      </Link>
    </main>
  );
}
