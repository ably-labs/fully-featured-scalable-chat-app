import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import Auth0Credentials from "./clientConfig";

import App from "./App.jsx";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider domain={Auth0Credentials.domain} clientId={Auth0Credentials.clientId} redirectUri={"http://localhost:8080/"} audience={Auth0Credentials.audience}>
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (undefined /* [snowpack] import.meta.hot */) {
  undefined /* [snowpack] import.meta.hot */
    .accept();
}
