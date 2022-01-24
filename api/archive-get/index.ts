import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { ArchiveService } from "../common/services/ArchiveService";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";
import { ok } from "../common/http/CommonResults";

export default async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(context, req, async (authContext: ApiRequestContext) => {

    const archive = new ArchiveService();
    const offset = parseInt(req?.query?.offset || "0");

    const items = [];

    let lastPosition = 0;
    for await (const { messages, position } of archive.readHistory(req.params.channelName, offset)) {
      items.push(...messages);
      lastPosition = position;
    }

    for (const message of items) {
      if (typeof message.data === "string" && message.encoding === "json") {
        try {
          message.data = JSON.parse(message.data);
        } catch (e) {
          context.log("Failed to parse message data as JSON", e, message);
        }
      }
    }

    context.res = ok("success", { messages: items, position: lastPosition });
  });
}