import React from "react";
import "./footer.css";
import ablyLogo from "./ably-logo-full-rbg-pos.png";

const Header = () => {
  return (
    <footer>
      Powered by <img src={ablyLogo} alt="Ably" />
    </footer>
  );
};

export default Header;
