import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { authorized } from "../common/ApiRequestContext";
import { ChannelService } from "../common/services/ChannelService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(
    context,
    req,
    async () => {
      const channelId = req.body.channelId;
      const channelService = new ChannelService();
      const { channel } = await channelService.getChannelById(channelId);

      console.log(`Channel: ${JSON.stringify(channel)}`);

      context.res = {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(channel)
      };
    },
    true
  );
};

export default httpTrigger;
