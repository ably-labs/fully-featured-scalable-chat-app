import React, { useState } from "react";
import "./loginregister.css";
import { BffApiClient } from "../../sdk/BffApiClient";
import { useAuth } from "../../AppProviders";

const Register = () => {
  const { auth, onLoginSuccess } = useAuth();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const client = new BffApiClient();
    const { success, token, userDetails } = await client.register(username, firstName, surname, password);

    if (!success) {
      console.log("Oh no!");
    } else {
      onLoginSuccess(token, userDetails);
    }
  };

  return (
    <main className="loginregister">
      <form className="loginregister-form" onSubmit={handleSubmit}>
        <h2 className="loginregister-title">Create an Account</h2>
        <label className="loginregister-label">
          <span className="loginregister-label-text">username</span>
          <input type="text" placeholder="username" value={username} onChange={(ele) => setUsername(ele.target.value)}></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">first name</span>
          <input type="text" placeholder="first name" value={firstName} onChange={(ele) => setFirstName(ele.target.value)}></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">surname</span>
          <input type="text" placeholder="surname" value={surname} onChange={(ele) => setSurname(ele.target.value)}></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">password</span>
          <input type="password" placeholder="password" value={password} onChange={(ele) => setPassword(ele.target.value)}></input>
        </label>
        <button className="login-register-button">Create Account</button>
      </form>
    </main>
  );
};

export default Register;