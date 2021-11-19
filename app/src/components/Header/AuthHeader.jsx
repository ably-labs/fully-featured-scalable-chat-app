import React from "react";
import AppMenu from "../Nav/AppMenu";
import logo from "../../logo.svg";
import "./header.css";

const Header = () => {
  return (
    <header className="authed">
      <img src={logo} alt="logo" />
      <h1>FFS Chat</h1>
      <AppMenu />
    </header>
  );
};

export default Header;
