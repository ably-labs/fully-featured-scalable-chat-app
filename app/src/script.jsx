import React from "react";
import ReactDOM from "react-dom";
import AppProviders from "./AppProviders";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthContextProvider } from "./contexts/authContext";
import { BrowserRouter } from "react-router-dom";
import Auth0Credentials from "./clientConfig";
import "./index.css";

import App from "./App.jsx";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <Auth0Provider domain={Auth0Credentials.domain} clientId={Auth0Credentials.clientId} redirectUri={window.location.origin + "/login"} audience={Auth0Credentials.audience}>
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </Auth0Provider>
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (undefined /* [snowpack] import.meta.hot */) {
  undefined /* [snowpack] import.meta.hot */
    .accept();
}
