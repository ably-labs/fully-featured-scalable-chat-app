import React from "react";
import Header from "../Header/UnauthHeader";
import Footer from "../Footer/Footer";
import AuthContainer from "../Authentication/AuthContainer";

const UnauthenticatedApp = () => {
  return (
    <>
      <Header />
      <AuthContainer />
      <Footer />
    </>
  );
};

export default UnauthenticatedApp;
