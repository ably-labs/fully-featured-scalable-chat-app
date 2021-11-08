import { default as sut } from "./index";

describe("OAuth Configuration API", () => {
  let context: any;
  beforeEach(() => {
    context = {};
  });

  it("called, returns 200 and settings from env that can work with both auth0 SDKs", async () => {
    process.env.AUTH0_DOMAIN = "a";
    process.env.AUTH0_CLIENTID = "b";
    process.env.AUTH0_REDIRECT_URI = "c";

    await sut(context, { body: { token: "some-valid-auth0-token" } });
    const responseBody = JSON.parse(context.res.body);

    expect(context.res.status).toBe(200);
    expect(responseBody.domain).toBe("a");
    expect(responseBody.clientID).toBe("b");
    expect(responseBody.client_id).toBe("b");
    expect(responseBody.redirect_uri).toBe("c");
  });
});
