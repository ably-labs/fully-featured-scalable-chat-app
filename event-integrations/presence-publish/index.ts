import { AzureFunction, Context } from "@azure/functions";
import { Types, Realtime } from "ably/promises";
import { ChannelPresenceMessage } from "../common/metadata/ChannelPresenceMessage";
import { ChannelService } from "../common/services/ChannelService";

// This function is triggered on an interval and publishes a custom channel presence message for all channels.
const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const options: Types.ClientOptions = { authUrl: "/api/ably/token-request" };
  const realtime = new Realtime.Promise(options);
  realtime.connect();
  const utilityChannelName = "utility-channel";
  const utilityChannel = realtime.channels.get(utilityChannelName);

  const channelPresenceMessages: ChannelPresenceMessage[] = [];
  const channelService = new ChannelService();
  const channels = await channelService.getAllChannels();
  if (channels.exists) {
    channels.channels.forEach((channel) => {
      const channelPresenceMessage: ChannelPresenceMessage = {
        channelId: channel.id,
        membersOnlineCount: channel.onlineCount
      };
      channelPresenceMessages.push(channelPresenceMessage);
    });
  }

  await utilityChannel.publish("channel-presence", channelPresenceMessages);
};

export default timerTrigger;
