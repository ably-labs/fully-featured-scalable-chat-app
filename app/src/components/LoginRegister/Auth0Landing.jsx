import React, { useEffect } from "react";
import { useAuth } from "../../AppProviders";
import { BffApiClient } from "../../sdk/BffApiClient";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0Landing = () => {
  const { onLoginSuccess, authMethods } = useAuth();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(async () => {
    const auth0token = await getAccessTokenSilently();
    console.log(auth0token);

    const client = new BffApiClient();
    const { success, token, userDetails } = await client.auth0Authenticate(auth0token);

    if (!success) {
      console.log("Oh no! We didn't auth"); // Add UI feedback for bad creds here
    } else {
      onLoginSuccess(token, userDetails, authMethods.AUTH0_METHOD);
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default Auth0Landing;
