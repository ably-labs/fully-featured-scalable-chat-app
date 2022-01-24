import React, { useContext, createContext } from "react";
import { userPersistentState } from "../hooks/usePersistentState";
import { FeatureAdminPanel } from "./FeatureAdminPanel";

let featureSettings = {};
const FeatureContext = createContext();

/**
 * The FeatureToggleProvider, when wrapping your application, provides feature settings to all child components.
 * A factory function that returns the feature settings must be configured by setting `loadConfigurationFrom`.
 * The provider will handle feature-overrides if enabled. 
 * @property {Object}  props.loadConfigrationFrom - A function returning a configuration object: { [featureName]: { enabled: boolean } }
 * 
 * e.g: { "feature1": { enabled: true }, "feature2": { enabled: false } }
 * @property {Object}  props.canOverrideFeatures - A function returning a boolean. If true, the user can override the feature settings.
 * @property {boolean}  props.includeAdminPanel - Display feature admin panel if the user can override the feature settings.
 */
export const FeatureToggleProvider = (props) => {
    const { loadConfigrationFrom, canOverrideFeatures, includeAdminPanel, children } = props;
    featureSettings = loadConfigrationFrom();

    const featureAdminPanel = includeAdminPanel && canOverrideFeatures && canOverrideFeatures()
        ? <FeatureAdminPanel />
        : <></>;

    return (<FeatureToggleContextProvider>{featureAdminPanel}{children}</FeatureToggleContextProvider>);
}

const FeatureToggleContextProvider = (props) => {
    const [overrides, updateOverrides] = userPersistentState("feature-overrides", {});
    return <FeatureContext.Provider value={{ featureSettings, overrides, updateOverrides }} {...props} />;
}

export const FeatureToggle = ({ name, ...rest }) => {
    const { children } = rest;
    const { featureSettings, overrides } = useFeatures();

    const settings = featureSettings[name] ?? { enabled: true };
    const isReallyEnabledString = (overrides[name] ?? settings.enabled).toString();

    return isReallyEnabledString === "true" ? <>{children}</> : <></>;
}

export const useFeatures = () => useContext(FeatureContext);
export default FeatureToggleProvider;