import React, { useContext } from "react";
import { useAuth } from "./AppProviders";
import Header from "./components/Header"
import LoginRegister from "./components/LoginRegister"
import "./App.css";

const App = () => {
  const { auth } = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
};


const AuthenticatedApp = () => {
  return (
    <div>logged in!</div>
  )
}

const UnauthenticatedApp = () => {
  return (
    <>
      <Header />
      <LoginRegister />
    </>
  )
}

export default App;