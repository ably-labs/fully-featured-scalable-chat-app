export class BffApiClient {
  constructor(jwtToken, fetchFunc = null) {
    this._jwtToken = jwtToken;
    this._fetchFunc = fetchFunc;
  }

  async fetch(input, init) {
    init.headers = this._jwtToken ? { ...init.headers, jwt: this._jwtToken } : init.headers;
    const func = this._fetchFunc || fetch;
    return await func(input, init);
  }

  async get(input) {
    return await this.fetch(input, { method: "GET", headers: {} });
  }
  async post(input, body) {
    return await this.fetch(input, {
      method: "POST",
      headers: {},
      body: JSON.stringify(body)
    });
  }

  async signIn(username, password) {
    const result = await this.post("/api/account/signin", {
      username,
      password
    });

    if (result.status !== 200) {
      return { success: false, token: null, userDetails: null };
    }

    const body = await result.json();
    return { success: true, ...body };
  }

  async auth0Authenticate(token) {
    const result = await this.post("/api/oauth/login", { token });

    if (result.status !== 200) {
      return { success: false, token: null, userDetails: null };
    }

    const body = await result.json();
    return { success: true, ...body };
  }

  async register(username, firstName, lastName, password) {
    const result = await this.post("/api/account/register", {
      username,
      firstName,
      lastName,
      password
    });

    if (result.status !== 200) {
      return { success: false, token: null, userDetails: null };
    }

    const { token, userDetails } = await result.json();
    return { success: true, token, userDetails };
  }

  async validate() {
    const result = await this.get("/api/account/validate");
    return result.status === 200;
  }

  async listChannels() {
    const result = await this.get("/api/channels");
    return await result.json();
  }

  async getUserProfile(userId) {
    const result = await this.post("/api/users/get-profile/", { userId });
    return await result.json();
  }
}

export const unauthorizedBffApiClient = new BffApiClient();
