import React from "react";
import "./loginregister.css";

const LoginRegister = () => {
  const loginUser = () => {
    console.log("login clicked");
  };
  const signUpUser = () => {
    console.log("sign up clicked");
  };
  return (
    <main>
      <button onClick={signUpUser}>Create Account</button>
      <span>or</span>
      <button onClick={loginUser}>Sign In</button>
    </main>
  );
};

export default LoginRegister;
