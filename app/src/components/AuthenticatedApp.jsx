import React, { useState } from "react";
import Footer from "./Footer";
import ChannelBrowser from "../pages/ChannelBrowser";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AuthenticatedApp = () => {

  const [additionalCSS, setAdditionalCSS] = useState("channel-view");

  const toggleChannelView = () => {
    const state = additionalCSS == "chat-view" ? "channel-view" : "chat-view";
    setAdditionalCSS(state);
  }

  return (
    <>
      <main className={additionalCSS}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <ChannelBrowser toggleChannelView={toggleChannelView} />
            </Route>
            <Route path="/channel/*">
              <ChannelBrowser toggleChannelView={toggleChannelView} />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  );
};

export default AuthenticatedApp;
