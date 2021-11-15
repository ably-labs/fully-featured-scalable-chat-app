import React from "react";
import "./header.css";
import logo from "../../logo.svg";

const Header = () => {
  return (
    <header className="unauthed">
      <img src={logo} alt="Fully Featured Scalable Chat" />
      <h1>Fully Featured Scalable Chat</h1>
    </header>
  );
};

export default Header;
