import React, { useState } from "react";
import "./loginregister.css";
import { BffApiClient } from "../../sdk/BffApiClient";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  // const { auth, onLoginSuccess } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithPopup } = useAuth0();

  return (
    <main className="loginregister">
      <form className="loginregister-form">
        <h2 className="loginregister-title">Sign In</h2>
        <label className="loginregister-label">
          <span className="loginregister-label-text">username</span>
          <input type="text" placeholder="username" value={username} onChange={(ele) => setUsername(ele.target.value)}></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">password</span>
          <input type="password" placeholder="password" value={password} onChange={(ele) => setPassword(ele.target.value)}></input>
        </label>
        <button className="login-register-button" onClick={() => loginWithPopup()}>
          Sign In
        </button>
      </form>
    </main>
  );
};

export default Login;
