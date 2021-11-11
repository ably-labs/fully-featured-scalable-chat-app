const fakeCalls = {};

export function mockCall(name: string, callback: (...args: any[]) => any) {
  fakeCalls[name] = callback;
}

class FakeAuthenticationClient {
  constructor() {}

  getProfile(): Promise<any> {
    return fakeCalls["getProfile"]?.apply(this, arguments);
  }
}

const auth0Mock = { AuthenticationClient: FakeAuthenticationClient };
jest.doMock("auth0", () => auth0Mock);
