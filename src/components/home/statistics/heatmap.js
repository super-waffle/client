import React, { useEffect, useState } from "react";
import ReactCalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css";
import "../../../statics/css/home/heatmap.css";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import DailyStats from "./dailystats";
import { useSelector } from "react-redux";

function Heatmap() {
  const [yearData, setYearData] = useState("");
  const [dayData, setDayData] = useState("");
  const [finalData, setFinalData] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const defaultDay = useSelector((state) => state.schedule.today);
  const [isShowDaily, setIsShowDaily] = useState(false);
  const [daymap, setDaymap] = useState(new Map());

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  async function getYearData() {
    const response = await axios
      .get("/stats/year", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setYearData(() => res.data.result);
        }
      });
  }
  const timeRange = (min) => {
    const number = [0, 1, 2, 3, 4];
    const time = Math.ceil(min / 60 / 4);
    if (time < 5) {
      return number[time];
    } else {
      return 4;
    }
  };

  useEffect(() => {
    if (yearData) {
      yearData.forEach((element) => {
        const dayIndex = daymap.get(element.date);
        dayData[dayIndex].time = element.dayTotalTime;
        dayData[dayIndex].count = timeRange(element.dayTotalTime);
      });
    }
    setFinalData(() => dayData);
  }, [yearData]);

  useEffect(() => {
    getRange(400).map((index) => {
      const date = shiftDate(today, -index).toISOString().slice(0, 10);
      daymap.set(date, index);
      setDayData((prev) => [
        ...prev,
        {
          date: date,
          count: 0,
          time: "no data",
        },
      ]);
    });
  }, []);

  useEffect(() => {
    getYearData();
  }, []);
  // console.log(selectedDay);

  // 데이터 받아오면 지울 부분
  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const today = new Date();
  const randomValues = getRange(2000).map((index) => {
    // console.log(index);
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(0, 3),
    };
  });
  // console.log(randomValues);
  // 여기까지 지우면 됨

  return (
    <div className="heatmap">
      {finalData && (
        <div>
          <ReactCalendarHeatmap
            startDate={shiftDate(today, -363)}
            endDate={today}
            values={finalData}
            classForValue={(value) => {
              if (!value) {
                return "color-beammp-0";
              }
              return `color-beammp-${value.count}`;
            }}
            tooltipDataAttrs={(value) => {
              return {
                "data-tip": `${value.date}`,
              };
            }}
            showOutOfRangeDay={true}
            showWeekdayLabels={false}
            onClick={(value) => setSelectedDay(value.date)}
          />
          <ReactTooltip />
        </div>
      )}
      <div>
        <DailyStats defaultDay={defaultDay} selectedDay={selectedDay} />
      </div>
    </div>
  );
}
export default Heatmap;
