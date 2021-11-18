import React from "react";
import { useAuth } from "./AppProviders";
import AuthenticatedApp from "./components/Authentication/AuthenticatedApp";
import UnauthenticatedApp from "./components/Authentication/UnauthenticatedApp";
import "./App.css";

const App = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
