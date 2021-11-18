import React from "react";
import NavMenu from "../Nav/NavMenu";
import logo from "../../logo.svg";
import "./header.css";

const Header = () => {
  return (
    <header className="authed">
      <img src={logo} alt="logo" />
      <h1>FFS Chat</h1>
      <NavMenu />
    </header>
  );
};

export default Header;
