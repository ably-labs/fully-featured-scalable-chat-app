import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { UserService } from "../common/services/UserService";
import { authorized } from "../common/ApiRequestContext";
import { etagFor, etagMatches, notFound, notModified, ok } from "../common/http/CommonResults";

/// This function is triggered by all channels that start with "user-presence-".
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(
    context,
    req,
    async () => {
      // TODO: read UserPresenceMessage from body
      // Lookup the channels the user belongs to
      // For each channel:
      //    - look up the ChannelPresence & update the ChannelPresence
      //    - get the channel presence (by channel name)
      //    - publish aggregate message to the global-presence channel.
    },
    undefined,
    true
  );
};

export default httpTrigger;
