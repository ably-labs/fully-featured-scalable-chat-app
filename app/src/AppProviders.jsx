import React, { useContext, createContext } from "react";
import { userPersistentState } from "./hooks/usePersistentState";
import { BffApiClient } from "./sdk/BffApiClient";
import { configureAbly } from "@ably-labs/react-hooks";
import createAuth0Client from "@auth0/auth0-spa-js";

const AuthContext = createContext();

function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

function AuthProvider(props) {
  const [auth, setAuthState] = userPersistentState("auth", {
    isAuthenticated: false,
    userDetails: null,
    token: null
  });

  const createNewAuth0Client = async () => {
    const configResponse = await fetch("/api/oauth/config");
    const configValues = await configResponse.json();
    const auth0 = await createAuth0Client(configValues);
    if (!auth0.isAuthenticated()) {
      return "Not authenticated"; // Do something better here
    } else {
      const auth0Token = await auth0.getTokenSilently();
      const client = new BffApiClient();
      const { success, token, userDetails } = await client.auth0Authenticate(auth0Token);

      if (!success) {
        return "Oh no! We didn't auth"; // Add UI feedback for bad creds here
      }
      onLoginSuccess(token, userDetails);
      return "Successfully authenticated with Auth0";
    }
  };
  const onLoginSuccess = (token, userDetails) => {
    setAuthState({ isAuthenticated: true, userDetails, token });
    window.location.href = "/"; // TODO: What's the react way to do this?
  };

  const logout = async () => {
    const configResponse = await fetch("/api/oauth/config");
    const configValues = await configResponse.json();
    const auth0 = await createAuth0Client(configValues);
    setAuthState({ isAuthenticated: false, userDetails: null, token: null });
    auth0.logout({ returnTo: "http://localhost:8080" });
    window.location.href = "/";
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
    configureAbly({ authUrl: "/api/ably/token-request", authHeaders: { jwt: auth.token } });
  }

  const api = auth.isAuthenticated ? new BffApiClient(auth.token) : null;
  const contextObject = { ...auth, user: auth.userDetails, api, onLoginSuccess, logout, createNewAuth0Client };

  return <AuthContext.Provider value={contextObject} {...props} />;
}

export const useAuth = () => useContext(AuthContext);
export default AppProviders;
