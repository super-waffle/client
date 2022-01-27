import React, { useState, useCallback } from "react";
import "../statics/css/modal.css";

const Modal = (props) => {
  const { open, close, header } = props;
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <img
              className="close"
              onClick={close}
              src="icons/_x-btn.svg"
              alt=""
            ></img>
            {/* <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button> */}
          </header>
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;
