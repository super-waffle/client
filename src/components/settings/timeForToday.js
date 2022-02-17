export default function TimeForToday(value) {
  const date = new Date();
  const offset = new Date().getTimezoneOffset() * 60000;
  const newDate = new Date(date - offset);
  const today = newDate.toISOString().slice(0, 19);

  const timeValue = value.value;
  const todayArray = today.split("T");
  const todayTimeArray = todayArray[1].split(":");
  const alarmArray = timeValue.split("T");
  const alarmTimeArray = alarmArray[1].split(":");

  const dif =
    Number(todayTimeArray[0]) * 60 +
    Number(todayTimeArray[1]) -
    (Number(alarmTimeArray[0]) * 60 + Number(alarmTimeArray[1]));

  if (alarmArray[0] !== todayArray[0]) {
    return timeValue.slice(0, 10);
  } else if (dif < 60) {
    return <div>{dif}분 전</div>;
  } else {
    return <div>{parseInt(dif / 60)}시간 전</div>;
  }
}
