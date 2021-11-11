import React from "react";
import ReactDOM from "react-dom";
import AppProviders from "./AppProviders";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";

import App from "./App.jsx";

console.log(import.meta.env.SNOWPACK_PUBLIC_AUTH0_DOMAIN, import.meta.env.SNOWPACK_PUBLIC_AUTH0_CLIENT_ID, import.meta.env.SNOWPACK_PUBLIC_AUTH0_REDIRECT_URI);

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <BrowserRouter>
        <Auth0Provider
          domain={import.meta.env.SNOWPACK_PUBLIC_AUTH0_DOMAIN}
          clientId={import.meta.env.SNOWPACK_PUBLIC_AUTH0_CLIENT_ID}
          redirectUri={import.meta.env.SNOWPACK_PUBLIC_AUTH0_REDIRECT_URI}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
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
