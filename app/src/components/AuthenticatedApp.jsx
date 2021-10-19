import React from "react";
import Header from "./Header/AuthHeader";
import Footer from "./Footer";
import Nav from "./Nav";
import ChannelBrowser from "./ChannelBrowser";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AuthenticatedApp = () => {
    return (
        <>
            <Header />
            <Nav />
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