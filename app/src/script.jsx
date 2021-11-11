import.meta.hot;
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App.jsx";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={__SNOWPACK_ENV__.SNOWPACK_PUBLIC_AUTH0_DOMAIN}
        clientId={__SNOWPACK_ENV__.SNOWPACK_PUBLIC_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        audience={__SNOWPACK_ENV__.SNOWPACK_PUBLIC_AUTH0_AUDIENCE}
      >
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
