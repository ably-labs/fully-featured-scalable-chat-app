import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Choose from "./choose";
import CreateAccount from "./register";
import SignIn from "./login";
import "./loginregister.css";
import Auth0PostLoginLanding from "./Auth0PostLoginLanding";

const LoginRegister = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={CreateAccount} />
        <Route path="/login" component={SignIn} />
        <Route path="/auth0-landing" component={Auth0PostLoginLanding} />
        <Route exact path="/" component={Choose} />
      </Switch>
    </BrowserRouter>
  );
};

export default LoginRegister;
