import React from "react";
import Header from "./Header/UnauthHeader";
import Footer from "./Footer";
import LoginRegister from "./LoginRegister";

const UnauthenticatedApp = () => {
    return (
        <>
            <Header />
            <LoginRegister />
            <Footer />
        </>
    )
}


export default UnauthenticatedApp;