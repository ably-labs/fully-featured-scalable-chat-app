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
    return await this.fetch(input, { method: "POST", headers: {}, body: JSON.stringify(body) });
  }

  async getAblyToken() {
    const result = await this.get("ably/token-request");
    const processedResult = await result.json();
    console.log(processedResult, "processedResult");
    return processedResult;
  }

  async listChannels() {
    const result = await this.get("/api/channels");
    return await result.json();
  }
}
