import { PresenceStatus } from "./PresenceStatus";
import { User } from "./User";

describe("User", () => {
  let sut: User;
  beforeEach(() => {
    sut = new User();
  });

  it("Is online", () => {
    sut.lastOnlineTimeStampUTC = new Date(2022, 2, 1, 14, 5);
    const current = new Date(2022, 2, 1, 14, 6); // Current time is within 5 minute threshold of last online.
    const result = sut.getOnlineStatus(current);

    expect(result).toBe(PresenceStatus.Online);
  });

  it("Is not online", () => {
    sut.lastOnlineTimeStampUTC = new Date(2022, 2, 1, 14, 5);
    const current = new Date(2022, 2, 1, 14, 11); // Current time exceeds 5 minute threshold of last online.
    const result = sut.getOnlineStatus(current);

    expect(result).toBe(PresenceStatus.Offline);
  });
});
