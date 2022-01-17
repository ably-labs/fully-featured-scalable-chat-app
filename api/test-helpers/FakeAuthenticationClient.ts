const fakeCalls = {};

export function mockCall(name: string, callback: (...args: any[]) => any) {
  fakeCalls[name] = callback;
}

class FakeAuthenticationClient {
  getProfile(): Promise<any> {
    // eslint-disable-next-line prefer-rest-params
    return fakeCalls["getProfile"]?.apply(this, arguments);
  }
}

const auth0Mock = { AuthenticationClient: FakeAuthenticationClient };
jest.doMock("auth0", () => auth0Mock);
