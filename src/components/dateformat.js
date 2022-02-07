export default function ChangeDateFormat(props) {
  const endDate = props.endDate;
  const monoth = "" + (endDate.getMonth() + 1);
  const date = "" + endDate.getDate();
  const year = "" + endDate.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}
