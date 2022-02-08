import { useState } from "react";

export default function StudyRecruitDetail({ history, location, match }) {
  const [data, setData] = useState("");
  // const { no } = match.params;
  console.log(history, location, match);
  return (
    <div>
      <h2>상세정보</h2>
    </div>
  );
}
