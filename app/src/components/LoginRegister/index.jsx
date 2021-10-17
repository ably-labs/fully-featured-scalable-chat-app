import React from "react";
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
  return (
    <main>
      <form className="loginregister">
        <h2 className="loginregister-title">Create an Account</h2>
        <label className="loginregister-label">
          <span className="loginregister-label-text">username</span>
          <input type="text" placeholder="username"></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">first name</span>
          <input type="text" placeholder="first name"></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">surname</span>
          <input type="text" placeholder="surname"></input>
        </label>
        <label className="loginregister-label">
          <span className="loginregister-label-text">password</span>
          <input type="password" placeholder="password"></input>
        </label>
        <button className="login-register-button" onClick={ () => {}}>Create Account</button>
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
