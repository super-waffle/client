import { Outlet, NavLink } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>공부하는 습관</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <NavLink to="/home">홈</NavLink> |{" "}
        <NavLink to="/meetingrooms">자유열람실</NavLink> |{" "}
        <NavLink to="/studyrooms">스터디룸</NavLink> |{" "}
        <NavLink to="/schedules">일정관리</NavLink> |{" "}
        <NavLink to="/profile">프로필</NavLink> |{" "}
        <NavLink to="/settings">마이페이지</NavLink> |{" "}
        <NavLink to="/login">로그인</NavLink> |{" "}
        <NavLink to="/signup">회원가입</NavLink> |{" "}
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
