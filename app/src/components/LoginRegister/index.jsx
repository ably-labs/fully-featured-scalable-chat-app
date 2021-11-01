import React from "react";
import { Link } from "react-router-dom";
import "./loginregister.css";
import { useAuth0 } from "@auth0/auth0-react";

const Choose = () => {
  const { loginWithPopup } = useAuth0();
  return (
    <main className="loginregister">
      <button onClick={loginWithPopup}>Create Account</button>
      <span className="hr">or</span>
      <button onClick={loginWithPopup}>Sign In</button>
    </main>
  );
};

export default Choose;
