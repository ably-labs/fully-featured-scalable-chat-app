export class BffApiClient {
  constructor(jwtToken, fetchFunc = null) {
    this._jwtToken = jwtToken;
    this._fetchFunc = fetchFunc;
  }

  async fetchFromAzureFunctions(input, init) {
    init.headers = this._jwtToken ? { ...init.headers, jwt: this._jwtToken } : init.headers;
    input = "/api/" + input;
    return await fetch(input, init);
  }

  async get(input) {
    return await this.fetchFromAzureFunctions(input, { method: "GET", headers: {} });
  }
  async post(input, body) {
    return await this.fetchFromAzureFunctions(input, { method: "POST", headers: {}, body: JSON.stringify(body) });
  }

  async getAblyToken() {
    const result = await this.get("ably-token-request");
    return await result.json();
  }

  async listChannels() {
    const result = await this.get("channels");
    return await result.json();
  }
}
