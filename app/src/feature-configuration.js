export const loadFeatureConfig = () => ({
    "Login_Auth0": { enabled: true },
    "Login_Native": { enabled: true }
});

export const isFeatureAdmin = () => {
    return true; // check JWT permissions
}
