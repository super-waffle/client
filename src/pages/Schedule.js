import { useEffect } from "react";
import Calendar from "../components/Schedule/calendar";
import "../statics/css/Schedule.css";

export default function Schedule() {
  // useEffect(() => {
  //   window.location.reload();
  // }, []);
  return (
    <main className="schedule">
      <Calendar />
    </main>
  );
}
