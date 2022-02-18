import { addItemToDb, clearDbItems } from "../../test-helpers/FakeCosmosDbMetadataRepository";
import { Channel, ChannelVisibility } from "../metadata/Channel";
import { ChannelDeletionRequest, ChannelCreationRequest, ChannelService } from "./ChannelService";

describe("ChannelService", () => {
  let sut: ChannelService;
  beforeEach(() => {
    sut = new ChannelService();
    clearDbItems();
  });

  it("Can retrieve an existing Channel item by channelName.", async () => {
    const channelName: string = "testChannel1";
    const item1 = {
      id: "123",
      name: "testChannel1",
      type: "Channel"
    };
    const item2 = {
      id: "456",
      name: "testChannel2",
      type: "Channel"
    };
    addItemToDb("Channel", item1);
    addItemToDb("Channel", item2);
    const result = await sut.getChannelByName(channelName);

    expect(result.channel.name).toBe(channelName);
  });

  it("Can retrieve all channels.", async () => {
    const item1 = {
      id: "123",
      name: "testChannel1",
      type: "Channel"
    };
    const item2 = {
      id: "456",
      name: "testChannel2",
      type: "Channel"
    };
    addItemToDb("Channel", item1);
    addItemToDb("Channel", item2);

    const result = await sut.getAllChannels();

    expect(result.channels).toHaveLength(2);
  });

  it("Can create a channel.", async () => {
    const channelName = "testChannel1";
    const item = {
      id: "123",
      name: channelName,
      type: "Channel"
    };
    addItemToDb("Channel", item);

    const channelRequest: ChannelCreationRequest = {
      channelName: channelName,
      description: "Test Channel 1 description",
      createdBy: "testUser1",
      visibility: ChannelVisibility.Public
    };

    const result = await sut.createChannel(channelRequest);

    expect(result.name).toBe(channelRequest.channelName);
  });

  it("Can delete a channel.", async () => {
    // TODO
  });

  it("Can remove a member.", async () => {
    // TODO
  });

  it("Can update online count.", async () => {
    // TODO
  });
});
