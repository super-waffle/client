import { NavLink } from "react-router-dom";
import "../statics/css/navbarSettings.css";

const firstSection = [
  { name: "내 프로필 관리", toNavigate: "profile" },
  { name: "계정 관리", toNavigate: "admin" },
  { name: "알림 보관함", toNavigate: "alarm" },
];

const secondSection = [
  // { name: "내 스터디 전체보기", toNavigate: "study" },
  { name: "내가 개설한 스터디 관리", toNavigate: "mystudy" },
  { name: "참여 신청한 스터디 관리", toNavigate: "studyapplied" },
];

const thirdSection = [
  { name: "자유열람실 관리", toNavigate: "meeting" },
  { name: "자유열람실 즐겨찾기", toNavigate: "meeting-fav" },
];

const settingsNav = (props) => {
  return (
    <NavLink className="navbar-settings-box__menus-menu" to={props.toNavigate}>
      <div className="navbar-settings-box__menus-menu-box">
        <div className="navbar-settings-box__menus-menu-box active-box"></div>
        <div className="navbar-settings-box__menus-menu-box-content">
          {props.name}
        </div>
      </div>
    </NavLink>
  );
};

function NavbarSettings() {
  return (
    <div className="navbar-settings">
      <div className="navbar-settings-box">
        <div className="navbar-settings-box__menus top">
          {firstSection.map((info) => settingsNav(info))}
        </div>

        <div className="navbar-settings-box__menus">
          {secondSection.map((info) => settingsNav(info))}
        </div>
        <div className="navbar-settings-box__menus">
          {thirdSection.map((info) => settingsNav(info))}
        </div>
      </div>
    </div>
  );
}
export default NavbarSettings;
