import React, { useState } from "react";
import { useAuth } from "../../AppProviders";
import "./loginregister.css";
import { BffApiClient } from "../../sdk/BffApiClient";

const Login = () => {
  const { auth, onLoginSuccess } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async (event) => {
    event.preventDefault();

    const client = new BffApiClient();
    const { success, token, userDetails } = await client.signIn(username, password);

    if (!success) {
      console.log("Oh no!", result.body); // Add UI feedback for bad creds here
    } else {
      onLoginSuccess(token, userDetails);
    }
  };

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
        <button className="login-register-button" onClick={doLogin}>
          Sign In
        </button>
      </form>
    </main>
  );
};

export default Login;
