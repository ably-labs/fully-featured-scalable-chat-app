import { addItemToDb, clearDbItems } from "../../test-helpers/FakeCosmosDbMetadataRepository";
import { ChannelPresenceService } from "./ChannelPresenceService";
import { PresenceStatus } from "../metadata/PresenceStatus";

describe("ChannelPresenceService", () => {
  let sut: ChannelPresenceService;
  beforeEach(() => {
    sut = new ChannelPresenceService();
    clearDbItems();
  });

  it("Can retrieve an existing ChannelPresence item by channelName.", async () => {
    const channelName: string = "testChannel";
    const item1 = {
      id: "123",
      username: "testUser1",
      channelName: channelName,
      userPresence: PresenceStatus.Online
    };
    const item2 = {
      id: "456",
      username: "testUser2",
      channelName: channelName,
      userPresence: PresenceStatus.Offline
    };
    addItemToDb("ChannelPresence", item1);
    addItemToDb("ChannelPresence", item2);
    const result = await sut.getPresenceByChannelName(channelName);

    expect(result).toHaveLength(2);
  });

  it("Can retrieve an existing ChannelPresence item by username.", async () => {
    const username: string = "testUser1";
    const item1 = {
      id: "123",
      username: username,
      channelName: "channelName1",
      userPresence: PresenceStatus.Online
    };
    const item2 = {
      id: "789",
      username: username,
      channelName: "channelName2",
      userPresence: PresenceStatus.Online
    };
    addItemToDb("ChannelPresence", item1);
    addItemToDb("ChannelPresence", item2);

    const result = await sut.getPresenceByUsername(username);

    expect(result).toHaveLength(2);
  });
});
