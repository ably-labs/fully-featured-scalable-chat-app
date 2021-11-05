import React from "react";
import { Link } from "react-router-dom";
import "./loginregister.css";
import { Auth0Client } from '@auth0/auth0-spa-js';

const Choose = () => {

  const auth0Login = async (event) => {
    event.preventDefault();

    const configResponse = await fetch("/api/oauth/config");
    const configValues = await configResponse.json();
    const auth0 = new Auth0Client(configValues);
    await auth0.loginWithRedirect();
  };

  return (
    <main className="loginregister">
      <Link to="/register">Create Account</Link>
      <span className="hr">or</span>
      <Link to="/login">Sign In</Link>
      <span className="hr">or</span>
      <button className="login-register-button" onClick={auth0Login}>Login with Auth0</button>
    </main>
  );
};

export default Choose;
