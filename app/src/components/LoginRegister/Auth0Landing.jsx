import React, { useEffect } from "react";
import { AuthMethods, useAuth } from "../../AppProviders";
import { useAuth0 } from "../../sdk/Auth0Client";
import { unauthorizedBffApiClient } from "../../sdk/BffApiClient";

const Auth0Landing = () => {
  const { onLoginSuccess } = useAuth();

  useEffect(async () => {
    const auth0 = await useAuth0();
    const auth0token = await auth0.getTokenSilently();

    const { success, token, userDetails } = await unauthorizedBffApiClient.auth0Authenticate(auth0token);

    if (!success) {
      console.log("Oh no! We didn't auth"); // Add UI feedback for bad creds here
    } else {
      onLoginSuccess(token, userDetails, AuthMethods.auth0);
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default Auth0Landing;
