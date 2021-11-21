import React, { useState } from "react";
import { AuthMethods, useAuth } from "../../AppProviders";
import { unauthorizedBffApiClient } from "../../sdk/BffApiClient";
import "./auth.css";

const NativeLogin = () => {
  const { onLoginSuccess } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async (event) => {
    event.preventDefault();

    const { success, token, userDetails } = await unauthorizedBffApiClient.signIn(username, password);

    if (!success) {
      console.log("Oh no!"); // Add UI feedback for bad creds here
    } else {
      onLoginSuccess(token, userDetails, AuthMethods.native);
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
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ele) => setPassword(ele.target.value)}
          ></input>
        </label>
        <button className="login-register-button" onClick={doLogin}>
          Sign In
        </button>
      </form>
    </main>
  );
};

export default NativeLogin;
