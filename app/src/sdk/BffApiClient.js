export class BffApiClient {

    constructor(jwtToken, fetchFunc = null) {
        this._jwtToken = jwtToken;
        this._fetch = fetchFunc || fetch;
    }

    async signIn(username, password) {

        const result = await this._fetch("/api/account/signin", {
            method: "POST",
            headers: {},
            body: JSON.stringify({ username, password })
        });
        
        if (result.status !== 200) {
            return { success: false, token: null, userDetails: null };
        }

        const { token, userDetails } = await result.json();
        return { success: true, token, userDetails };
    }

    async register(username, firstName, lastName, password) {
        const result = await this._fetch("/api/account/register", {
            method: "POST",
            headers: {},
            body: JSON.stringify({ username, firstName, lastName, password })
        });

        if (result.status !== 200) {
            return { success: false, token: null, userDetails: null };
        }

        const { token, userDetails } = await result.json();
        return { success: true, token, userDetails };
    }

    async validate() {
        const result = await this._fetch("/api/account/validate", {
            method: "GET",
            headers: { "jwt": this._jwtToken }
        });

        return result.status === 200;
    }

    async listChannels() {
        const result = await this._fetch("/api/channels", {
            method: "GET",
            headers: { "jwt": this._jwtToken }
        });

        return await result.json();
    }
}