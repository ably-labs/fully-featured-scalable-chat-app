import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { UserService } from "../common/services/UserService";
import { ChannelService } from "../common/services/ChannelService";
import { UserPresenceMessage } from "../common/metadata/UserPresenceMessage";
import { authorized } from "../common/ApiRequestContext";
import { etagFor, etagMatches, notFound, notModified, ok } from "../common/http/CommonResults";

/// This function is triggered by all channels that start with "user-presence-".
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(
    context,
    req,
    async () => {
      const data = { ...req.body } as UserPresenceMessage;

      // 1. Get the User
      // 2. Update the OnlineStatus
      // 3. Get all the channels the user belongs to
      // 4. For each channel:
      //    - update the channel presence
      //    - publish aggregate message to the global-presence channel.
    },
    undefined,
    true
  );
};

export default httpTrigger;
