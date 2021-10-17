import React, { useContext, createContext, useState } from "react";
import { userPersistentState } from './hooks/usePersistentState';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { BffApiClient } from "./sdk/BffApiClient";

const AuthContext = createContext();

function AppProviders({children}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

function AuthProvider(props) {

  const [auth, setAuthState] = userPersistentState("auth", {
    isAuthenticated: false,
    userDetails: null,
    token: null,
  });

  const onLoginSuccess = (token, userDetails) => {
    setAuthState({ isAuthenticated: true, userDetails, token });
    window.location.href = "/"; // TODO: What's the react way to do this?
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, userDetails: null, token: null });
    window.location.href = "/"; // TODO: What's the react way to do this?
  } 

  const validateToken = async () => {
    if (auth.isAuthenticated) {
      const client = new BffApiClient();
      const isValid = await client.validate(auth.token);
      if(!isValid) {
        logout();
      }
    }
  }

  validateToken();

  return (
    <AuthContext.Provider value={ { auth, onLoginSuccess, logout }} {...props} />
  )
}

export const useAuth = () => useContext(AuthContext);
export default AppProviders