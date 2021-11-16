import React from "react";
import ReactDOM from "react-dom";
import AppProviders from "./AppProviders";
import { loadFeatureConfig, isFeatureAdmin } from "./feature-configuration";
import FeatureToggleProvider from "./feature-toggle/Feature";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <BrowserRouter>
        <FeatureToggleProvider loadConfigurationFrom={loadFeatureConfig} includeAdminPanel={true} canOverrideFeatures={isFeatureAdmin}>
          <App />
        </FeatureToggleProvider>
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
