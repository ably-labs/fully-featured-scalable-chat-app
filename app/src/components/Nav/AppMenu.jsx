import React from "react";
import "./nav.css";
import { useAuth } from "../../AppProviders";

const AppMenu = () => {
  const { _, __, logout } = useAuth();

  const processLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <div className="main-menu">
      <input type="checkbox" id="checkbox-toggle" />
      <label className="menu-title" htmlFor="checkbox-toggle">
        Menu
      </label>
      <nav className="main-nav">
        <button onClick={processLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default AppMenu;
