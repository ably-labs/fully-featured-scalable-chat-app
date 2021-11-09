import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";
import * as Ably from "ably/promises";

const client = new Ably.Realtime(process.env.ABLY_API_KEY);

export default async function (context: Context, req: HttpRequest): Promise<void> {
  const authContext = await authorized(context, req, true);

  if (!authContext) {
    return;
  }

  const user = authContext.user;
  const clientId = `${user.id}:${user.username}`;

  const tokenRequestData = await client.auth.createTokenRequest({ clientId: clientId });
  context.res = {
    headers: { "content-type": "application/json" },
    body: JSON.stringify(tokenRequestData)
  };
}
