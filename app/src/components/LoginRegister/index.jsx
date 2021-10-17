import React, { useState } from "react";
import "./loginregister.css";

const LoginRegister = () => {

  const [ displayMode, setDisplayMode ] = React.useState("choice");

  switch (displayMode) {
    case "createAccount":
      return (<Create />);
      break;
      
    case "signIn":
      return (<SignIn />);
      break;
  
    default:
      return (
        <main>
          <button onClick={ () => { setDisplayMode("createAccount"); }}>Create Account</button>
          <span className="hr">or</span>
          <button onClick={ () => { setDisplayMode("signIn"); }}>Sign In</button>
        </main>
      );
      break;
  }
};

const Create = () => {

  const [ username, setUsername ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ surname, setSurname ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formSubmission = { username, firstName, lastName: surname, password };
    const result = await fetch("/api/account/register", {  
        method: "POST",
        headers: {},
        body: JSON.stringify(formSubmission)
      }
    );

    if (result.status !== 200) {
      console.log("Oh no!");
    } else {
      console.log("Success!");
    }
  };

  return (
    <main>
      <form className="loginregister" onSubmit={handleSubmit}>
        <h2 className="loginregister-title">Create an Account</h2>
        <label className="loginregister-label">
          <span className="loginregister-label-text">username</span>
          <input type="text" placeholder="username" value={username} onChange={ ele => setUsername(ele.target.value) }></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">first name</span>
          <input type="text" placeholder="first name" value={firstName} onChange={ ele => setFirstName(ele.target.value) }></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">surname</span>
          <input type="text" placeholder="surname" value={surname} onChange={ ele => setSurname(ele.target.value) }></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">password</span>
          <input type="password" placeholder="password" value={password} onChange={ ele => setPassword(ele.target.value) }></input>
        </label>
        <button className="login-register-button">Create Account</button>
      </form>
    </main>
  );
};


const SignIn = () => {
  return (
    <main>
      <form className="loginregister">
        <h2 className="loginregister-title">Sign In</h2>
        <label className="loginregister-label">
          <span className="loginregister-label-text">username</span>
          <input type="text" placeholder="username"></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">password</span>
          <input type="password" placeholder="password"></input>
        </label>
        <button className="login-register-button" onClick={ () => {}}>Sign In</button>
      </form>
  </main>
  );
};

export default LoginRegister;
