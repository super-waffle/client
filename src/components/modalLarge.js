import React from "react";
import "../statics/css/modalLarge.css";

const ModalLarge = (props) => {
  const { open, close, header } = props;
  return (
    <div className={open ? "openModalLarge modalLarge" : "modalLarge"}>
      {open ? (
        <section>
          <header>
            {header}
            <svg
              className="close"
              onClick={close}
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="0.707153"
                width="1"
                height="10"
                rx="0.5"
                transform="rotate(-45 0 0.707153)"
                fill="#bababa"
              />
              <rect
                x="7.07129"
                width="1"
                height="10"
                rx="0.5"
                transform="rotate(45 7.07129 0)"
                fill="#bababa"
              />
            </svg>
            {/* <img
              className="close"
              onClick={close}
              src="icons/_x-btn.svg"
              alt=""
            ></img> */}
          </header>
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>
  );
};
export default ModalLarge;
