import { NavLink } from "react-router-dom";
import "../statics/css/navbarSettings.css";

function NavbarSettings() {
  return (
    <div className="navbar-settings">
      <div className="navbar-settings-box">
        <div className="navbar-settings-box__menus top">
          <NavLink className="navbar-settings-box__menus-menu" to={"profile"}>
            <div className="navbar-settings-box__menus-menu-box">
              <div className="navbar-settings-box__menus-menu-box active-box"></div>
              <div className="navbar-settings-box__menus-menu-box-content">
                내 프로필 관리
              </div>
            </div>
          </NavLink>

          <NavLink className="navbar-settings-box__menus-menu" to={"admin"}>
            <div className="navbar-settings-box__menus-menu-box">
              <div className="navbar-settings-box__menus-menu-box active-box"></div>
              <span className="navbar-settings-box__menus-menu-box-content">
                계정 관리
              </span>
            </div>
          </NavLink>

          <NavLink className="navbar-settings-box__menus-menu" to={"alarm"}>
            <div className="navbar-settings-box__menus-menu-box">
              <div className="navbar-settings-box__menus-menu-box active-box"></div>
              <span className="navbar-settings-box__menus-menu-box-content">
                알림 보관함
              </span>
            </div>
          </NavLink>
        </div>

        <div className="navbar-settings-box__menus">
          <NavLink className="navbar-settings-box__menus-menu" to={"/"}>
            <div className="navbar-settings-box__menus-menu-box">
              <div className="navbar-settings-box__menus-menu-box active-box"></div>
              <span className="navbar-settings-box__menus-menu-box-content">
                내 스터디 전체보기
              </span>
            </div>
          </NavLink>

          <NavLink className="navbar-settings-box__menus-menu" to={"study"}>
            <div className="navbar-settings-box__menus-menu-box">
              <div className="navbar-settings-box__menus-menu-box active-box"></div>
              <span className="navbar-settings-box__menus-menu-box-content">
                내가 개설한 스터디 관리
              </span>
            </div>
          </NavLink>

          <NavLink className="navbar-settings-box__menus-menu" to={"/"}>
            <div className="navbar-settings-box__menus-menu-box">
              <div className="navbar-settings-box__menus-menu-box active-box"></div>
              <span className="navbar-settings-box__menus-menu-box-content">
                참여 신청한 스터디
              </span>
            </div>
          </NavLink>

          <NavLink className="navbar-settings-box__menus-menu" to={"/"}>
            <div className="navbar-settings-box__menus-menu-box">
              <div className="navbar-settings-box__menus-menu-box active-box"></div>
              <span className="navbar-settings-box__menus-menu-box-content">
                진행중인 스터디
              </span>
            </div>
          </NavLink>
        </div>
        <div className="navbar-settings-box__menus">
          <NavLink className="navbar-settings-box__menus-menu" to={"meeting"}>
            <div className="navbar-settings-box__menus-menu-box">
              <div className="navbar-settings-box__menus-menu-box active-box"></div>
              <span className="navbar-settings-box__menus-menu-box-content">
                자유열람실 관리
              </span>
            </div>
          </NavLink>

          <NavLink
            className="navbar-settings-box__menus-menu"
            to={"meeting-fav"}
          >
            <div className="navbar-settings-box__menus-menu-box">
              <div className="navbar-settings-box__menus-menu-box active-box"></div>
              <span className="navbar-settings-box__menus-menu-box-content">
                자유열람실 즐겨찾기
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default NavbarSettings;
