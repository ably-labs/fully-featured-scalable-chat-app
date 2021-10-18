import React, { useContext, createContext } from "react";
import { userPersistentState } from './hooks/usePersistentState';
import { BffApiClient } from "./sdk/BffApiClient";
import { configureAbly } from "@ably-labs/react-hooks";

const AuthContext = createContext();

function AppProviders({ children }) {
  return (<AuthProvider>{children}</AuthProvider>)
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
      const client = new BffApiClient(auth.token);
      const isValid = await client.validate();
      if (!isValid) {
        logout();
      }
    }
  }

  validateToken();

  if (auth.isAuthenticated) {
    configureAbly({ authUrl: '/api/ably/token-request', authHeaders: { 'jwt': auth.token } });
  }

  const api = auth.isAuthenticated ? new BffApiClient(auth.token) : null;
  const contextObject = { ...auth, user: auth.userDetails, api, onLoginSuccess, logout };

  return (
    <AuthContext.Provider value={contextObject} {...props} />
  )
}

export const useAuth = () => useContext(AuthContext);
export default AppProviders