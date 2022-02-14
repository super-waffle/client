const checkStudyStatus = ({ study, nickname }) => {
  if (nickname === study.hostName) {
    if (study.isRecruiting && study.startDate === null) {
      return '모집중';
    }
    if (!study.isRecruiting) {
      return '모집마감';
    }
    if (study.startDate !== null) {
      return '스터디 진행중';
    }
  }
};

export default function RecruitingStudy({
  study,
  nickname,
  setSelectedSeq,
  selectedStudySeq,
  showStudyDetail,
  setShowStudyDetail,
}) {
  const onClick = () => {
    setSelectedSeq(study.studySeq);
    setShowStudyDetail((current) => !current);
  };
  return (
    <tr
      className={`settings-study-mystudy ${
        study.studySeq === selectedStudySeq ? 'study-selected' : ''
      }`}
      onClick={onClick}
    >
      <td className="settings-study-mystudy-category">{study.categoryName}</td>
      <td className="settings-study-mystudy-title">
        <div className="mystudy-title">{study.title}</div>
        <div className="mystudy-shorts">{study.shortDescription}</div>
      </td>
      <td className="settings-study-mystudy-status">
        {checkStudyStatus({ study, nickname })}
      </td>
      <td className="settings-study-mystudy-members">
        {study.memberList.length}/6
      </td>
    </tr>
  );
}
