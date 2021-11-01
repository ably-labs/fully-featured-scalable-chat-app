import React from "react";
import Header from "./Header/AuthHeader";
import Footer from "./Footer";
import Nav from "./Nav";
import ChannelBrowser from "../pages/ChannelBrowser";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { configureAbly } from "@ably-labs/react-hooks";
import { BffApiClient } from "../sdk/BffApiClient";

const AuthenticatedApp = () => {
  const bffClient = new BffApiClient();
  bffClient.getAblyToken();
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
