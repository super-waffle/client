import React, { useState } from "react";
import * as dataFns from "date-fns";
import "../statics/css/datepickerStart.css";

export default function StudyDatePickerStart() {
  const [date, setDate] = useState(new Date());
  return (
    <div className="datepicker-start">{dataFns.format(date, "yyyy/MM/dd")}</div>
  );
}
