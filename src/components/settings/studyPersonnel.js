import { Container, Row, Col } from "react-bootstrap";
import "../../statics/css/settings/studyPersonnel.css";

export default function StudyPersonnel({
  applicants,
  members,
  setSelectedApplicant,
  setModalStatus,
  myname,
}) {
  const selectApplicant = (data) => {
    setSelectedApplicant(() => data);
  };
  console.log(members);
  return (
    <div className="settings-study-members">
      {applicants ? (
        <div className="settings-study-members-left">
          <div className="settings-study-members__heading">신청자 목록</div>
          <div className="settings-study-members__queue">
            <Container>
              <Row>
                {applicants &&
                  applicants.map((applicant) => (
                    <Col lg={6} key={applicant.userSeq}>
                      <div
                        className="study-personnel__applicants"
                        onClick={() => {
                          selectApplicant(applicant);
                          setModalStatus(() => true);
                        }}
                        style={{ cursor: "pointer" }}
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
              {members &&
                members.map((member) => (
                  <Col lg={6} key={member.userSeq}>
                    <div className="study-personnel__applicants">
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
                        {member.userImage && (
                          <img
                            className="settings-study-details-img"
                            src={`https://i6a301.p.ssafy.io:8080/images/${member.userImage}`}
                            alt=""
                          />
                        )}
                        {member.userNickname === myname && (
                          <svg
                            className="host-crown"
                            width="640"
                            height="512"
                            viewBox="0 0 640 512"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M528 448H112C103.2 448 96 455.2 96 464V496C96 504.8 103.2 512 112 512H528C536.8 512 544 504.8 544 496V464C544 455.2 536.8 448 528 448ZM592 128C565.5 128 544 149.5 544 176C544 183.1 545.6 189.7 548.4 195.8L476 239.2C460.6 248.4 440.7 243.2 431.8 227.6L350.3 85C361 76.2 368 63 368 48C368 21.5 346.5 0 320 0C293.5 0 272 21.5 272 48C272 63 279 76.2 289.7 85L208.2 227.6C199.3 243.2 179.3 248.4 164 239.2L91.7 195.8C94.4 189.8 96.1 183.1 96.1 176C96.1 149.5 74.6 128 48.1 128C21.6 128 0 149.5 0 176C0 202.5 21.5 224 48 224C50.6 224 53.2 223.6 55.7 223.2L128 416H512L584.3 223.2C586.8 223.6 589.4 224 592 224C618.5 224 640 202.5 640 176C640 149.5 618.5 128 592 128Z"
                              fill="#F2C831"
                            />
                          </svg>
                        )}
                      </div>
                      {member.userNickname}
                    </div>
                  </Col>
                ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
