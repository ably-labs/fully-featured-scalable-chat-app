import React from "react";
import "./logout.css";
import { useAuth } from "../../AppProviders";
 

const Logout = () => {

  const { _, __, logout } = useAuth();

  const processLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <button className="logout" onClick={processLogout}>Logout</button>
  );
};

export default Logout;
