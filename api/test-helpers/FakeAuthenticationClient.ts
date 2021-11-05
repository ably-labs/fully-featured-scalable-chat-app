const fakeCalls = {};

export function mockCall(name: string, callback: (...args: any[]) => any) {
    fakeCalls[name] = callback;
}

class FakeAuthenticationClient {
    constructor() {
    }

    getProfile(): Promise<any> {
        return fakeCalls['getProfile']?.apply(this, arguments);
    }
}

export const Mock = { AuthenticationClient: FakeAuthenticationClient };
