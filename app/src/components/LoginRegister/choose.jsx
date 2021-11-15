import React from "react";
import { Link } from "react-router-dom";
import { loginWithRedirect } from "../../sdk/Auth0Client";
import "./loginregister.css";

const Choose = () => {
  return (
    <main className="loginregister">
      <Link to="/register">Create Account</Link>
      <span className="hr">or</span>
      <Link to="/login">Sign In</Link>
      <span className="hr">or</span>
      <button onClick={loginWithRedirect}>
        Login with Auth0
      </button>
    </main>
  );
};

export default Choose;
