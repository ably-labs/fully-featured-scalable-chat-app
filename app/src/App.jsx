import React from "react";
import { useAuth } from "./AppProviders";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginRegister from "./components/LoginRegister";
import Logout from "./components/Logout";
import ChannelBrowser from "./components/ChannelBrowser";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  const { auth } = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
};

const Settings = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Settings</h1>
      </main>
      <Footer />
    </>
  );
}

const AuthenticatedApp = () => {
  return (
    <>
      <Header />
      <Logout />
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ChannelBrowser} />
            <Route path="/channel/*" component={ChannelBrowser} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  )
}

const UnauthenticatedApp = () => {
  return (
    <>
      <Header />
      <LoginRegister />
      <Footer />
    </>
  )
}

export default App;