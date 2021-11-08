import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";
import { ok } from "../common/http/CommonResults";

type ChannelSummary = { name: string };
type ChannelListResponse = { channels: ChannelSummary[] };

export default async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(context, req, (authContext: ApiRequestContext) => {
    const channels: ChannelListResponse = {
      channels: [{ name: "global-welcome" }, { name: "some-other-channel" }],
    };

    context.res = ok("loaded", channels);
  });
}
