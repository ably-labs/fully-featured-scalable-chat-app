import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./nav.css";

const Nav = () => {
  const { logout } = useAuth0();

  return (
    <div className="main-menu">
      <input type="checkbox" id="checkbox-toggle" />
      <label className="menu-title" htmlFor="checkbox-toggle">
        Menu
      </label>
      <nav className="main-nav">
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
};

export default Nav;
