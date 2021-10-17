import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Choose from "./choose";
import CreateAccount from "./register";
import SignIn from "./login";
import "./loginregister.css";

const LoginRegister = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={CreateAccount} />
        <Route path="/login" component={SignIn} />
        <Route exact path="/" component={Choose} />
      </Switch>
    </BrowserRouter>
  );
};

export default LoginRegister;
