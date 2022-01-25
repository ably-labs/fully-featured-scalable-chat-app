import { Context, HttpRequest } from "@azure/functions";
import { Tasks } from "./tasks";
import { AblyReactorEnvelope } from "./types";
import * as dotenv from "dotenv";
dotenv.config();

export default async function (context: Context, req: HttpRequest): Promise<void> {
  const envelope: AblyReactorEnvelope = req.body;

  for (const message of envelope.messages) {
    if (message.encoding === "json" && message.data && typeof message.data === "string") {
      message.data = JSON.parse(message.data);
    }

    for (const task of Tasks) {
      try {
        await task(envelope.channel, message);
      } catch (e) {
        context.log("Async task failed", e);
      }
    }
  }

  context.res = ok("received", req.body);
}

function ok(reason = "", responseObject: any = {}, headers = {}) {
  const bodyObj = { success: true, reason, ...responseObject };
  return { status: 200, body: JSON.stringify(bodyObj), headers: headers };
}
