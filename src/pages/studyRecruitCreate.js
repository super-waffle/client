import "../statics/css/studyRecruitCreate.css";

export default function StudyRecruitCreate() {
  return (
    <div className="recruit-create">
      <div className="recruit-create-heading">
        <span>스터디 모집하기</span>
      </div>
      <div className="recruit-create-contents">
        <div className="recruit-create-content">
          <table className="recruit-create-content-category">
            <tr>
              <td className="recruit-create-content-row a1">카테고리</td>
              <td>
                <select></select>
              </td>
            </tr>
          </table>
        </div>
        <div className="recruit-create-content">
          <table>
            <tr>
              <td className="recruit-create-content-row a1">스터디 이름</td>
              <td className="recruit-create-content-row a2">
                <input placeholder="스터디 이름을 입력하세요" />
              </td>
            </tr>
            <tr>
              <td className="recruit-create-content-row a1">한줄 소개</td>
              <td className="recruit-create-content-row a2">
                <input placeholder="간단한 소개를 작성해주세요" />
              </td>
            </tr>
          </table>
        </div>
        <div className="recruit-create-content">
          <table>
            <tr>
              <td className="recruit-create-content-row a1">스터디 요일</td>
            </tr>
            <tr>
              <td className="recruit-create-content-row a1">모집 기간</td>
            </tr>
          </table>
        </div>
        <div className="recruit-create-content">
          <div className="recruit-create-content-description">
            <span>스터디 소개</span>
            <textarea
              placeholder="스터디 모집 사항을 상세히 적어주세요"
              maxLength={1000}
            ></textarea>
          </div>
        </div>
      </div>
      <button>스터디 개설</button>
    </div>
  );
}
