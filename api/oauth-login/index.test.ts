import { addItemToDb, clearDbItems, saveOrUpdateCalls } from "../test-helpers/FakeCosmosDbMetadataRepository";
import { mockCall as mockAuth0Call } from "../test-helpers/FakeAuthenticationClient";

import { default as sut } from "./index";

describe("OAuth Registration API", () => {
  let context: any;
  beforeEach(() => {
    context = {};
    process.env.JWT_SIGNING_KEY = "secret";
    clearDbItems();
  });

  it("no existing users, returns 200 created", async () => {
    auth0Returns({ sub: "google:12345" });

    await sut(context, { body: { token: "some-valid-auth0-token" } });
    const responseBody = JSON.parse(context.res.body);

    expect(context.res.status).toBe(200);
    expect(responseBody.reason).toBe("created");
  });

  it("no existing users, creates user in datastore", async () => {
    auth0Returns({
      email: "foo@bar.com",
      given_name: "first",
      family_name: "last",
      sub: "google:12345"
    });

    await sut(context, { body: { token: "some-valid-auth0-token" } });

    const lastSavedItem = saveOrUpdateCalls.pop();
    expect(lastSavedItem.username).toBe("foo@bar.com");
    expect(lastSavedItem.firstName).toBe("first");
    expect(lastSavedItem.lastName).toBe("last");
    expect(lastSavedItem.oauthSub).toBe("google:12345");
    expect(lastSavedItem.email).toBe("foo@bar.com");
  });

  it("no existing users, returns user profile with data based on auth0 response", async () => {
    auth0Returns({
      email: "foo@bar.com",
      given_name: "first",
      family_name: "last",
      sub: "google:12345"
    });

    await sut(context, { body: { token: "some-valid-auth0-token" } });
    const responseBody = JSON.parse(context.res.body);

    expect(responseBody.userDetails.username).toBe("foo@bar.com");
    expect(responseBody.userDetails.firstName).toBe("first");
    expect(responseBody.userDetails.lastName).toBe("last");
  });

  it("existing user, logs in user", async () => {
    addItemToDb("User", {
      username: "foo@bar.com",
      firstName: "first",
      lastName: "last",
      oauthSub: "google:12345"
    });
    auth0Returns({
      email: "foo@bar.com",
      given_name: "first",
      family_name: "last",
      sub: "google:12345"
    });

    await sut(context, { body: { token: "some-valid-auth0-token" } });
    const responseBody = JSON.parse(context.res.body);

    expect(context.res.status).toBe(200);
    expect(responseBody.reason).toBe("logged in");
  });
});

const auth0Returns = (profile) => mockAuth0Call("getProfile", () => Promise.resolve(profile));
