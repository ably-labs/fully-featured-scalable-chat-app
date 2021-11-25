import React from "react";
import { useAuth } from "./AppProviders";
import AuthenticatedApp from "./components/AppContainers/AuthenticatedApp";
import UnauthenticatedApp from "./components/AppContainers/UnauthenticatedApp";
import "./App.css";

const App = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
