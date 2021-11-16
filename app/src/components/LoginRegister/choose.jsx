import React from "react";
import { Link } from "react-router-dom";
import { FeatureToggle } from "../../feature-toggle/Feature";
import { loginWithRedirect } from "../../sdk/Auth0Client";
import "./loginregister.css";

const Choose = () => {
  return (
    <main className="loginregister">
      <FeatureToggle name="Login_Native">
        <Link to="/register">Create Account</Link>
        <span className="hr">or</span>
        <Link to="/login">Sign In</Link>
      </FeatureToggle>
      <FeatureToggle name="Login_Auth0">
        <button onClick={loginWithRedirect}>Login with Auth0</button>
      </FeatureToggle>
    </main>
  );
};

export default Choose;
