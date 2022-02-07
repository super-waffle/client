export default function ChangeDateFormat(props) {
  const endDate = props.endDate;
  console.log(props);
  const month = "" + (endDate.getMonth() + 1);
  const date = "" + endDate.getDate();
  const year = "" + endDate.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (date.length < 2) date = "0" + date;
  const result = [year, month, date].join("-");
  props.dateformat(result);
}
