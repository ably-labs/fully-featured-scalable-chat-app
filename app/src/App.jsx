import React from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button";
import headerImage from "./logo.png";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container">
      <header className="header">
        <img src={headerImage} className="header-image" alt="logo" />
      </header>
      <div className="auth-btns">
        {/* Both the buttons do the same currently */}
        <Button text={"Create an account"} onClick={() => loginWithRedirect()} />
        <div className="separator">or</div>
        <Button text={"Sign in"} onClick={() => loginWithRedirect()} />
      </div>
    </div>
  );
};

export default App;
