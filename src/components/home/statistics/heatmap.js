import React, { useEffect, useState } from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
// import "react-calendar-heatmap/dist/styles.css";
import '../../../statics/css/home/heatmap.css';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import DailyStats from './dailystats';
import { useSelector } from 'react-redux';

function Heatmap() {
  const [yearData, setYearData] = useState('');
  const [dayData, setDayData] = useState('');
  const [finalData, setFinalData] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const defaultDay = useSelector((state) => state.schedule.today);
  const [daymap, setDaymap] = useState(new Map());

  function shiftDate(date, numDays) {
    const offset = new Date().getTimezoneOffset() * 60000;
    const newDate = new Date(date - offset);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }
  const today = new Date();

  async function getYearData() {
    const response = await axios
      .get(process.env.REACT_APP_SERVER_URL + '/stats/year', {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('accessToken'),
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
    if (yearData && dayData && daymap) {
      yearData.forEach((element) => {
        const dayIndex = daymap.get(element.date);
        dayData[dayIndex].time = element.dayTotalTime;
        dayData[dayIndex].count = timeRange(element.dayTotalTime);
      });
      setFinalData(() => dayData);
    }
  }, [yearData, dayData, daymap]);

  useEffect(() => {
    getRange(400).map((index) => {
      const date = shiftDate(today, -index).toISOString().slice(0, 10);
      daymap.set(date, index);
      setDayData((prev) => [
        ...prev,
        {
          date: date,
          count: 0,
          time: 'no data',
        },
      ]);
    });
  }, []);

  useEffect(() => {
    getYearData();
  }, []);

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
                return 'color-beammp-0';
              }
              return `color-beammp-${value.count}`;
            }}
            tooltipDataAttrs={(value) => {
              return {
                'data-tip': `${value.date}`,
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
