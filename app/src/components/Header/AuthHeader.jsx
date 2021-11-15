import React from "react";
import Nav from "../Nav";
import logo from "../../logo.svg";
import "./header.css";

const Header = () => {
  return (
    <header className="authed">
      <img src={logo} alt="logo" />
      <h1>FFS Chat</h1>
      <Nav />
    </header>
  );
};

export default Header;
