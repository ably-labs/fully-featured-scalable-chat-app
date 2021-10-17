import React from "react";
import { Link } from "react-router-dom";
import "./loginregister.css";

const Choose = () => {
  return (
    <main className="loginregister">
      <Link to="/register">Create Account</Link>
      <span className="hr">or</span>
      <Link to="/login">Sign In</Link>
    </main>
  );
};

export default Choose;
