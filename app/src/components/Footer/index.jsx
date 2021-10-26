import React from "react";
import "./footer.css";
import ably from "./ably-logo-full-rbg-pos.png";

const Header = () => {
  return (
    <footer>
      Powered by <img src={ably} alt="Ably" />
    </footer>
  );
};

export default Header;
