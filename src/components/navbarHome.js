import { NavLink } from "react-router-dom";
import "../statics/css/navbarHome.css";

function NavbarHome() {
  return (
    <div className="sub-navbar">
      <div className="sub-navbar-menus">
        <NavLink className="sub-navbar-menu today" to={"tab=todays"}>
          {/* <img src="icons/home/_book.svg" alt=""></img> */}
          <svg
            width="17"
            height="13"
            viewBox="0 0 17 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.583328 2.18748C0.583328 2.18748 1.77083 0.833313 4.54166 0.833313C7.31249 0.833313 8.49999 2.18748 8.49999 2.18748V11.6666C8.49999 11.6666 7.31249 10.9896 4.54166 10.9896C1.77083 10.9896 0.583328 11.6666 0.583328 11.6666V2.18748Z"
              stroke="#0C0C0C"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 2.18748C8.5 2.18748 9.6875 0.833313 12.4583 0.833313C15.2292 0.833313 16.4167 2.18748 16.4167 2.18748V11.6666C16.4167 11.6666 15.2292 10.9896 12.4583 10.9896C9.6875 10.9896 8.5 11.6666 8.5 11.6666V2.18748Z"
              stroke="#0C0C0C"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Today's</span>
        </NavLink>
        <NavLink className="sub-navbar-menu achievement" to={"tab=achievement"}>
          {/* <img src="icons/home/_coin.svg" alt=""></img> */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.99992 14.6666C3.50212 14.6666 0.666586 11.6819 0.666586 7.99998C0.666586 4.31808 3.50212 1.33331 6.99992 1.33331C10.4977 1.33331 13.3333 4.31808 13.3333 7.99998C13.3333 11.6819 10.4977 14.6666 6.99992 14.6666Z"
              stroke="#0C0C0C"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.66663 5.86665C8.24232 5.52258 7.7129 5.33434 7.16663 5.33331C5.78596 5.33331 4.66663 6.52665 4.66663 7.99998C4.66663 9.47331 5.78596 10.6666 7.16663 10.6666C7.72929 10.6666 8.24863 10.468 8.66663 10.1333"
              stroke="#0C0C0C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.66663 1.33331C9.55529 1.33331 15.3333 1.99998 15.3333 7.99998C15.3333 14 9.55529 14.6666 6.66663 14.6666"
              stroke="#0C0C0C"
            />
          </svg>
          <span>Achievement</span>
        </NavLink>
        <NavLink className="sub-navbar-menu statistics" to={"tab=statistics"}>
          {/* <img src="icons/home/_light-bulb.svg" alt=""></img> */}
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.8125 13.25H7.5625H4.8125ZM1.375 5.01665C1.375 3.84085 1.88203 2.71322 2.78455 1.88181C3.68707 1.05039 4.91115 0.583313 6.1875 0.583313C7.46385 0.583313 8.68793 1.05039 9.59045 1.88181C10.493 2.71322 11 3.84085 11 5.01665C11.0005 5.73046 10.813 6.43373 10.4538 7.06621C10.0946 7.69869 9.57432 8.24152 8.9375 8.64818L8.56488 10.2733C8.51554 10.5729 8.35129 10.8462 8.10192 11.0437C7.85255 11.2413 7.53458 11.3499 7.20569 11.35H5.16931C4.84043 11.3499 4.52245 11.2413 4.27308 11.0437C4.02371 10.8462 3.85946 10.5729 3.81013 10.2733L3.4375 8.65515C2.80047 8.24704 2.28014 7.70294 1.92098 7.06934C1.56182 6.43573 1.37449 5.73144 1.375 5.01665V5.01665Z"
              stroke="#0C0C0C"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.125 8.5H9.25"
              stroke="#0C0C0C"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Statistics</span>
        </NavLink>
      </div>
    </div>
  );
}
export default NavbarHome;
