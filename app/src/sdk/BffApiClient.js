import LocalUserProfileCache from "./LocalUserProfileCache";

export class BffApiClient {
  constructor(jwtToken, fetchFunc = null) {
    this._jwtToken = jwtToken;
    this._fetchFunc = fetchFunc;
    this._profileCache = new LocalUserProfileCache();
  }

  async fetch(input, init) {
    init.headers = this._jwtToken ? { ...init.headers, jwt: this._jwtToken } : init.headers;
    const func = this._fetchFunc || fetch;
    return func(input, init);
  }

  async get(input) {
    return this.fetch(input, { method: "GET", headers: {} });
  }

  async post(input, body) {
    return this.fetch(input, {
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
    return result.json();
  }

  async getUserDetails(userId) {
    return this._profileCache.get(userId, async () => {
      const result = await this.get(`/api/users/${userId}`);
      return result.json();
    });
  }

  async getUsersDetails(userIds) {
    const next = {};
    for (let userId of userIds) {
      const { id, ...profile } = await this.getUserDetails(userId);
      next[id] = { id, ...profile };
    }
    return next;
  }

  async getChannelMetadata(channelId) {
    const result = await this.post("/api/channels/get-metadata", { channelId });
    return await result.json();
  }
}

export const unauthorizedBffApiClient = new BffApiClient();
