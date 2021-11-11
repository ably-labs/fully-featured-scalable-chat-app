import React from "react";
import "./nav.css";
import { useAuth } from "../../AppProviders";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = () => {
  const { _, __, logout } = useAuth();
  const auth0Client = useAuth0();

  const processLogout = (event) => {
    event.preventDefault();
    logout();
    if (auth0Client.isAuthenticated) {
      auth0Client.logout({
        returnTo: import.meta.SNOWPACK_PUBLIC_AUTH0_LOGOUT_REDIRECT
      });
    }
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

export default Nav;
