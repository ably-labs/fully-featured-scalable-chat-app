import { UserService } from "./UserService";

describe("UserService", () => {
  let sut: UserService;
  beforeEach(() => {
    sut = new UserService();
  });

  it("Can get a google based profile image url.", async () => {
    const email = "foo@bar.com";
    const oauthPicture = "https://lh3.googleusercontent.com/a-/ADh14GguMNzvfLXJIbvlIdYVq-p2H4KIrFojBg2p6897=s90-c";
    const size = 80;
    const result = await sut.getProfileImage(email, size, oauthPicture);

    expect(result).toBe("https://lh3.googleusercontent.com/a-/ADh14GguMNzvfLXJIbvlIdYVq-p2H4KIrFojBg2p6897=s80");
  });

  it("Can get a gravatar based profile image url that contains a default image link.", async () => {
    const email = "foo@bar.com";
    const oauthPicture = "";
    const size = 600;
    const result = await sut.getProfileImage(email, size, oauthPicture);

    expect(result).toContain("https://www.gravatar.com/avatar/f3ada405ce890b6f8204094deb12d8a8");
    expect(result).toContain("?d=https%3A%2F%2Fffsdatastore.blob.core.windows.net");
    expect(result).toContain("&s=600");
  });
});
