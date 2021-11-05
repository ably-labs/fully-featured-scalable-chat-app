import React, { useEffect } from "react";
import createAuth0Client from '@auth0/auth0-spa-js';
import { useAuth } from "../../AppProviders";
import { BffApiClient } from "../../sdk/BffApiClient";

const Auth0Landing = () => {

    const { onLoginSuccess } = useAuth();

    useEffect(async () => {
        const configResponse = await fetch("/api/oauth/config");
        const configValues = await configResponse.json();
        const auth0 = await createAuth0Client(configValues);

        if (!auth0.isAuthenticated()) {
            console.log("Not authenticated"); // Do something better here
        }

        const auth0token = await auth0.getTokenSilently();

        const client = new BffApiClient();
        const { success, token, userDetails } = await client.auth0Authenticate(auth0token);

        if (!success) {
            console.log("Oh no! We didn't auth"); // Add UI feedback for bad creds here
        } else {
            onLoginSuccess(token, userDetails);
        }

    }, []);

    return <div>Logging you in...</div>
};


export default Auth0Landing;