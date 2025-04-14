import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { UserService } from "../common/services/UserService";
import { ChannelService } from "../common/services/ChannelService";
import { UserPresenceMessage } from "../common/metadata/UserPresenceMessage";
import { authorized } from "../common/ApiRequestContext";
import { ok } from "../common/http/CommonResults";
import { PresenceStatus } from "../common/metadata/PresenceStatus";

/// This function is triggered by all channels that start with "user-presence-".
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(context, req, async () => {
    const data = { ...req.body } as UserPresenceMessage;
    const userService = new UserService();
    const channelService = new ChannelService();
    const user = await userService.updatePresenceStatus(data.userId, data.presenceStatus, data.lastOnlineTimeStampUTC);
    const { channels } = await channelService.getAllChannels();
    channels.forEach(async (channel) => {
      if (channel.isMember(user.id)) {
        switch (user.presenceStatus) {
          case PresenceStatus.Offline:
            channel.decrementOnlineCount();
            break;
          case PresenceStatus.Online:
            channel.incrementOnlineCount();
            break;
        }
        await channelService.updateChannel(channel);
      }
    });
    context.res = ok("success");
  });
};

export default httpTrigger;
