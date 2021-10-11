import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import Auth0ClientCredentials from "./clientConfig";

ReactDOM.render(
  <Auth0Provider
    domain={Auth0ClientCredentials.domain}
    clientId={Auth0ClientCredentials.clientId}
    redirectUri={window.location.origin}
    audience={Auth0ClientCredentials.audience}
  >
    <App />,
  </Auth0Provider>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (undefined /* [snowpack] import.meta.hot */) {
  undefined /* [snowpack] import.meta.hot */
    .accept();
}
