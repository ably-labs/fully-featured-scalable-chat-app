import React, { useContext, createContext } from "react";
import { userPersistentState } from "./hooks/usePersistentState";
import { BffApiClient } from "./sdk/BffApiClient";
import { configureAbly } from "@ably-labs/react-hooks";
import { useAuth0 } from "./sdk/Auth0Client";

const AuthContext = createContext();

function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export const AuthMethods = {
  auth0: "auth0",
  native: "native",
};

function AuthProvider(props) {
  const [auth, setAuthState] = userPersistentState("auth", {
    isAuthenticated: false,
    userDetails: null,
    token: null,
    authMethod: null,
  });

  const onLoginSuccess = (token, userDetails, authMethod) => {
    setAuthState({ isAuthenticated: true, userDetails, token, authMethod });
    window.location.href = "/"; // TODO: What's the react way to do this?
  };

  const logout = async () => {
    const { authMethod } = auth;
    setAuthState({
      isAuthenticated: false,
      userDetails: null,
      token: null,
      authMethod: null,
    });
    if (authMethod == AuthMethods.native) {
      window.location.href = "/";
    } else if (authMethod == AuthMethods.auth0) {
      const auth0Client = await useAuth0();
      if (auth0Client.isAuthenticated) {
        auth0Client.logout();
      }
    }
  };

  const validateToken = async () => {
    if (auth.isAuthenticated) {
      const client = new BffApiClient(auth.token);
      const isValid = await client.validate();
      if (!isValid) {
        logout();
      }
    }
  };

  validateToken();

  if (auth.isAuthenticated) {
    configureAbly({
      authUrl: "/api/ably/token-request",
      authHeaders: { jwt: auth.token },
    });
  }

  const api = auth.isAuthenticated ? new BffApiClient(auth.token) : null;
  const contextObject = {
    ...auth,
    user: auth.userDetails,
    api,
    onLoginSuccess,
    logout,
  };

  return <AuthContext.Provider value={contextObject} {...props} />;
}

export const useAuth = () => useContext(AuthContext);
export default AppProviders;
