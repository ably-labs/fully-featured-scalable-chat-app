import React from "react";
import AuthenticatedApp from "./components/AuthenticatedApp";
import UnauthenticatedApp from "./components/UnauthenticatedApp";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

const App = () => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
