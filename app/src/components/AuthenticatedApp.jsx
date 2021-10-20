import React from "react";
import Header from "./Header/AuthHeader";
import Footer from "./Footer";
import Nav from "./Nav";
import ChannelBrowser from "../pages/ChannelBrowser";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AuthenticatedApp = () => {
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
