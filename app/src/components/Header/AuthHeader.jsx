import React from "react";
import "./header.css";
import logo from '../../logo.svg';

const Header = () => {
  return (
    <header className="authed">
        <img src={logo} alt="logo" />
        <h1>Fully Featured Scalable Chat</h1>
    </header>
  );
};

export default Header;
