import { Container, Row, Col } from 'react-bootstrap';

export default function StudyPersonnel({ applicants, members }) {
  console.log(applicants, 'applicants');
  return (
    <div className="settings-study-members">
      <div className="settings-study-members-left">
        <div className="settings-study-members__heading">신청자 목록</div>
        <div className="settings-study-members__queue">
          <Container>
            <Row>
              {applicants &&
                applicants.map((applicant) => (
                  <Col lg={6} key={applicant.userSeq}>
                    {applicant.userNickname}
                  </Col>
                ))}
            </Row>
          </Container>
        </div>
      </div>
      <div className="settings-study-members-right">
        <div className="settings-study-members__heading">참여 스터디원</div>
        <div className="settings-study-members__queue">
          <Container>
            <Row>
              {members &&
                members.map((member) => (
                  <Col lg={6} key={member.userSeq}>
                    {member.userNickname}
                  </Col>
                ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
