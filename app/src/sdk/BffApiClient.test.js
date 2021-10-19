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

    it("should return 200 when calling signIn", async () => {
        fetchResponse.body = { success: true, token: "token", userDetails: { username: "blah" } };

        const response = await sut.signIn("user", "password");

        expect(response.success).toBe(true);
    });

});
