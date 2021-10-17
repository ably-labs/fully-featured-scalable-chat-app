import React, { useContext } from "react";
import { useAuth } from "./AppProviders";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginRegister from "./components/LoginRegister";
import ChannelList from "./components/ChannelList";
import Logout from "./components/Logout";
import Chat from "./components/Chat";
import "./App.css";

const App = () => {
  const { auth } = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
};


const AuthenticatedApp = () => {
  return (
    <>
      <Header />
      <main>
        <ChannelList />
        <Logout />
        <Chat />
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