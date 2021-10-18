import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Logout from "./Logout";
import ChannelBrowser from "./ChannelBrowser";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
                    </Switch>
                </BrowserRouter>
            </main>
            <Footer />
        </>
    )
}

export default AuthenticatedApp;