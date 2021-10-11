import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Button from "./components/Button";
import headerImage from "./logo.png";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { loginWithRedirect, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated) {
    let myToken = "";
    getAccessTokenSilently()
      .then((res) => {
        myToken = res;
        console.log(myToken);
        axios.get("http://localhost:5000/authorized", { headers: { authorization: `Bearer ${myToken}` } }).then(function (response) {
          // handle success
          console.log(response);
        });
      })
      .catch((err) => console.log(err));
  }

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
        <Button text={"Sign out"} onClick={() => logout()} />
      </div>
    </div>
  );
};

export default App;
