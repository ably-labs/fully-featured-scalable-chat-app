import { PresenceStatus, UserPresenceResult, UserPresenceService } from "./UserPresenceService";

describe("UserPresenceService", () => {
  let sut: UserPresenceService;
  beforeEach(() => {
    sut = new UserPresenceService();
  });

  it("Can get user presence for online user.", async () => {
    const userID = "foo@bar.com";
    const result = await sut.getUserPresence(userID);

    expect(result.presence).toBe(PresenceStatus.Online);
  });

  it("Can get user presence for offline user.", async () => {
    const userID = "foo@bar.com";
    const result = await sut.getUserPresence(userID);

    expect(result.presence).toBe(PresenceStatus.Offline);
  });
});
