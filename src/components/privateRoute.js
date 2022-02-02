import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Component } from "react/cjs/react.development";
import { isLogin } from "../utils/isLogin";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default PrivateRoute;
