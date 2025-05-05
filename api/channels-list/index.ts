import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized } from "../common/ApiRequestContext";

type ChannelSummary = { name: string; type: string };
type ChannelListResponse = { channels: ChannelSummary[] };

export default async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(context, req, () => {
    const channels: ChannelListResponse = {
      channels: [
        { name: "global-welcome", type: "public" },
        { name: "some-other-channel", type: "public" },
        { name: "utility", type: "private" }
      ]
    };

    context.res = { status: 200, body: JSON.stringify(channels) };
  });
}
