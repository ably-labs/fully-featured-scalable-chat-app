import React from "react";
import { Link } from "react-router-dom";
import "./loginregister.css";
import { useAuth0 } from "@auth0/auth0-react";

const Choose = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <main className="loginregister">
      <Link to="/register">Create Account</Link>
      <span className="hr">or</span>
      <Link to="/login">Sign In</Link>
      <span className="hr">or</span>
      <button className="login-register-button" onClick={loginWithRedirect}>
        Login with Auth0
      </button>
    </main>
  );
};

export default Choose;
