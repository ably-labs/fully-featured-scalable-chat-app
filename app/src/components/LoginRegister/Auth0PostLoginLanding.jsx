import React, { useEffect } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { useAuth } from "../../AppProviders";
import { BffApiClient } from "../../sdk/BffApiClient";

const Auth0PostLoginLanding = () => {
  const { createNewAuth0Client } = useAuth();

  useEffect(async () => {
    const authUsingAuth0 = await createNewAuth0Client();
    console.log(authUsingAuth0);
  }, []);

  return <div>Logging you in...</div>;
};

export default Auth0PostLoginLanding;
