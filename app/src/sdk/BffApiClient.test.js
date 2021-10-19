import { BffApiClient } from "./BffApiClient";

describe("BffApiClient", () => {

    let sut = null;
    let fetchResponse = { status: 200, body: {}, json: function () { return this.body; } };
    let fetchMock = null;

    beforeEach(() => {
        fetchMock = () => { return fetchResponse; };
        sut = new BffApiClient("token", fetchMock);
    });

    it("should be defined", () => {
        expect(sut).toBeDefined();
    });

    it("signIn valid creds, returns success=true", async () => {
        fetchResponse.body = successfulSignInResponse;
        const response = await sut.signIn("user", "password");
        expect(response.success).toBe(true);
    });

    it("signIn valid creds, returns token", async () => {
        fetchResponse.body = successfulSignInResponse;
        const response = await sut.signIn("user", "password");
        expect(response.token).toBe("token");
    });

    it("signIn invalid creds, returns non-200", async () => {
        fetchResponse.status = 400;
        const response = await sut.signIn("user", "bad-password");
        expect(response.success).toBe(false);
    });
});

const successfulSignInResponse = {
    success: true,
    token: "token",
    userDetails: { username: "blah" }
};