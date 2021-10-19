import React from "react";
import "./nav.css";
import { useAuth } from "../../AppProviders";
 

const Nav = () => {

  const { _, __, logout } = useAuth();

  const processLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <nav className="main-nav">
      <button onClick={processLogout}>Logout</button>
    </nav>
  );
};

export default Nav;
