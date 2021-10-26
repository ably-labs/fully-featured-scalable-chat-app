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
    <div className="main-menu">
      <input type="checkbox" id="checkbox-toggle" />
      <label class="menu-title" for="checkbox-toggle">
        Menu
      </label>
      <nav className="main-nav">
        <button onClick={processLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Nav;
