import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginOptions from "./LoginOptions";
import NativeRegister from "./NativeRegister";
import NativeLogin from "./NativeLogin";
import "./auth.css";
import Auth0PostLoginRedirect from "./Auth0PostLoginRedirect";

const AuthContainer = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={NativeRegister} />
        <Route path="/login" component={NativeLogin} />
        <Route path="/auth0-landing" component={Auth0PostLoginRedirect} />
        <Route exact path="/" component={LoginOptions} />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthContainer;
