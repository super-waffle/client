import React, { useState } from "react";
import * as dataFns from "date-fns";
import "../statics/css/datepickerStart.css";

export default function StudyDatePickerEnd({studyRecruitEnd}) {
  const [date, setDate] = useState(Date.parse(studyRecruitEnd));

  return (
    <div className="datepicker-start">{dataFns.format(date, "yyyy/MM/dd")}</div>
  );
}
