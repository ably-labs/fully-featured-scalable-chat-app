import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized } from "../common/ApiRequestContext";
import { ChannelService } from "../common/services/ChannelService";

export default async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(context, req, async () => {
    const channelService = new ChannelService();
    const { defaultChannelsList } = await channelService.getDefaultChannelsList();

    context.res = { status: 200, body: JSON.stringify(defaultChannelsList) };
  });
}
