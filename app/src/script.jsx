import React from "react";
import ReactDOM from "react-dom";
import AppProviders from "./AppProviders";
import { loadFeatureConfig, isFeatureAdmin } from "./feature-configuration";
import FeatureToggleProvider from "./feature-toggle/Feature";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <BrowserRouter>
        <FeatureToggleProvider
          loadConfigrationFrom={loadFeatureConfig}
          includeAdminPanel={false}
          canOverrideFeatures={isFeatureAdmin}>
          <App />
        </FeatureToggleProvider>
      </BrowserRouter>
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);