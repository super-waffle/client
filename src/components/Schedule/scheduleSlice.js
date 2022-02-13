import { createSlice } from '@reduxjs/toolkit';

//월요일 날짜 찾기
function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}
// 날짜 형식 변경
function changeDateFormat(d) {
  return (
    d.getFullYear() +
    '-' +
    (d.getMonth() + 1 > 9
      ? (d.getMonth() + 1).toString()
      : '0' + (d.getMonth() + 1)) +
    '-' +
    (d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate().toString())
  );
}
function changeStartDateFormat(d) {
  d = new Date(d);
  return (
    d.getFullYear() +
    '-' +
    (d.getMonth() + 1 > 9
      ? (d.getMonth() + 1).toString()
      : '0' + (d.getMonth() + 1)) +
    '-' +
    (d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate().toString())
  );
}

const today = JSON.stringify(changeDateFormat(new Date()));
const startDay = JSON.stringify(changeDateFormat(getMonday(new Date())));

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    today: today,
    startDay: startDay, // "2022-02-07" -> javascript date연산 -> "2022-01-31"
    selectedDay: today,
  },
  reducers: {
    toPrevWeek: (state) => {
      state.startDay = JSON.stringify(
        changeStartDateFormat(
          new Date(JSON.parse(state.startDay)).setDate(
            new Date(JSON.parse(state.startDay)).getDate() - 7
          )
        )
      );
    },
    toNextWeek: (state) => {
      state.startDay = JSON.stringify(
        changeStartDateFormat(
          new Date(JSON.parse(state.startDay)).setDate(
            new Date(JSON.parse(state.startDay)).getDate() + 7
          )
        )
      );
    },
    selectDay: (state, action) => {
      state.selectedDay = action.payload;
    },
  },
});

export const { toPrevWeek, toNextWeek, selectDay } = scheduleSlice.actions;
export default scheduleSlice.reducer;
