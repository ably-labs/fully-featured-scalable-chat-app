export const loadFeatureConfig = () => ({
    "LoginWithAuth0": { enabled: true }
});

export const isFeatureAdmin = () => {
    return true; // check JWT permissions
}