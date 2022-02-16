import "../statics/css/home/homeStatistics.css";
import Heatmap from "../components/home/statistics/heatmap";
import IfIWere from "../components/home/statistics/if";

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
        <span>내가 지금까지 공부한 시간으로...</span>
        <IfIWere />
      </div>
    </div>
  );
}
