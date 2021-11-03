import React from "react";
import Header from "./Header/AuthHeader";
import Footer from "./Footer";
import Nav from "./Nav";
import ChannelBrowser from "../pages/ChannelBrowser";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { configureAbly } from "@ably-labs/react-hooks";
import { BffApiClient } from "../sdk/BffApiClient";
import { useAuth0 } from "@auth0/auth0-react";

const AuthenticatedApp = () => {
  const { getAccessTokenSilently } = useAuth0();
  getAccessTokenSilently().then((auth0Token) => {
    const bffClient = new BffApiClient(auth0Token);
    configureAbly({
      authCallback: (tokenParams, callback) => {
        bffClient.getAblyToken().then((token) => {
          callback(null, token);
        });
      }
    });
  });
  return (
    <>
      <Header />
      <Nav />
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <ChannelBrowser />
            </Route>
            <Route path="/channel/*">
              <ChannelBrowser />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  );
};

export default AuthenticatedApp;
