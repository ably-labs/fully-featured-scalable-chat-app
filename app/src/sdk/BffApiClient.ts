export class BffApiClient {

    private _jwtToken: string;

    constructor(jwtToken: string) {
        this._jwtToken = jwtToken;
    }

    public async signIn(username: string, password: string): Promise<any> {

        const result = await fetch("/api/account/signin", {
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

    public async register(username, firstName, lastName, password): Promise<any> {
        const result = await fetch("/api/account/register", {
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

    public async validate(): Promise<any> {
        const result = await fetch("/api/account/validate", {
            method: "GET",
            headers: { "jwt": this._jwtToken }
        });

        return result.status === 200;
    }

    public async listChannels(): Promise<any> {
        const result = await fetch("/api/channels", {
            method: "GET",
            headers: { "jwt": this._jwtToken }
        });

        return await result.json();
    }
}