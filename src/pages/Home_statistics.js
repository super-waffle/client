import "../statics/css/homeStatistics.css";
import Heatmap from "../components/heatmap";

export default function HomeStatistics() {
  return (
    <div className="home-statistics">
      <div className="home-statistics-top">
        <span>365일의 공부 기록</span>
        <div className="home-statistics-top-box">
          <div className="home-statistics-top-box-calendar">
            <Heatmap />
          </div>
        </div>
      </div>
      <div className="home-statistics-bottom">
        <span>내가 목표시간을 달성했더라면...</span>
        <div className="home-statistics-bottom-box"></div>
      </div>
    </div>
  );
}
