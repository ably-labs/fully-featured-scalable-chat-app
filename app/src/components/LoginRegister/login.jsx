import React, { useState } from "react";
import { useAuth } from "../../AppProviders";
import "./loginregister.css";

const Login = () => {
  
  const { auth, onLoginSuccess } = useAuth();

  const doLogin = (event) => {
    event.preventDefault();
    onLoginSuccess();
  };

  return (
    <main>
      <form className="loginregister">
        <h2 className="loginregister-title">Sign In</h2>
        <label className="loginregister-label">
          <span className="loginregister-label-text">username</span>
          <input type="text" placeholder="username"></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">password</span>
          <input type="password" placeholder="password"></input>
        </label>
        <button className="login-register-button" onClick={doLogin}>Sign In</button>
      </form>
  </main>
  );
};

export default Login;
