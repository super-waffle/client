import { Container, Row, Col } from 'react-bootstrap';

export default function StudyPersonnel({
  applicants,
  members,
  setSelectedApplicant,
  setModalStatus,
}) {
  const selectApplicant = (data) => {
    setSelectedApplicant(() => data);
  };
  return (
    <div className="settings-study-members">
      {applicants ? (
        <div className="settings-study-members-left">
          <div className="settings-study-members__heading">신청자 목록</div>
          <div className="settings-study-members__queue">
            <Container>
              <Row>
                {/* 이미지 수정! by 승은  */}
                {applicants &&
                  applicants.map((applicant) => (
                    <Col lg={6} key={applicant.userSeq}>
                      <div
                        onClick={() => {
                          selectApplicant(applicant);
                          setModalStatus(() => true);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="settings-study-details-img-wrapper">
                          <svg
                            className="settings-study-details-img"
                            width="250"
                            height="250"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_233_15455)">
                              <path
                                d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                                fill="#f4f4f4"
                              />
                              <path
                                d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                                fill="#c0c0c0"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_233_15455">
                                <path
                                  d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                                  fill="white"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          {applicant.userImg && (
                            <img
                              className="settings-study-details-img"
                              src={`https://i6a301.p.ssafy.io:8080/images/${applicant.userImg}`}
                              alt=""
                            />
                          )}
                        </div>
                        {applicant.userNickname}
                      </div>
                    </Col>
                  ))}
              </Row>
            </Container>
          </div>
        </div>
      ) : null}
      <div className="settings-study-members-right">
        <div className="settings-study-members__heading">참여 스터디원</div>
        <div className="settings-study-members__queue">
          <Container>
            <Row>
              {/* 이미지 수정! by 승은 */}
              {members &&
                members.map((member) => (
                  <Col lg={6} key={member.userSeq}>
                    <div className="settings-study-details-img-wrapper">
                      <svg
                        className="settings-study-details-img"
                        width="250"
                        height="250"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_233_15455)">
                          <path
                            d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                            fill="#f4f4f4"
                          />
                          <path
                            d="M40 34.9906V40.0023H0V35.009C2.32658 31.8997 5.34651 29.3762 8.81965 27.6391C12.2928 25.9019 16.1233 24.9991 20.0067 25.0023C28.18 25.0023 35.44 28.9256 40 34.9906ZM26.67 15.0006C26.67 16.7688 25.9676 18.4645 24.7174 19.7147C23.4671 20.9649 21.7714 21.6673 20.0033 21.6673C18.2352 21.6673 16.5395 20.9649 15.2893 19.7147C14.039 18.4645 13.3367 16.7688 13.3367 15.0006C13.3367 13.2325 14.039 11.5368 15.2893 10.2866C16.5395 9.03636 18.2352 8.33398 20.0033 8.33398C21.7714 8.33398 23.4671 9.03636 24.7174 10.2866C25.9676 11.5368 26.67 13.2325 26.67 15.0006Z"
                            fill="#c0c0c0"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_233_15455">
                            <path
                              d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      {member.userImg && (
                        <img
                          className="settings-study-details-img"
                          src={`https://i6a301.p.ssafy.io:8080/images/${member.userImg}`}
                          alt=""
                        />
                      )}
                    </div>
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