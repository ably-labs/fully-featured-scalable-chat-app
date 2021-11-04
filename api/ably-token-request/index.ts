import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized } from "../common/ApiRequestContext";
import * as Ably from "ably/promises";

const superClient = new Ably.Rest(process.env.ABLY_API_KEY);

export default async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(
    context,
    req,
    async (token) => {
      let authChannel = superClient.channels.get("auth:" + token.body.sub);
      let history = await authChannel.history({ limit: 1 });

      let key;
      let keys = {
        admin: process.env.ABLY_ADMIN_ROLE_KEY,
        basic: process.env.ABLY_BASIC_ROLE_KEY
      };

      // If the user doesn't have a pre-existing role, assign them as a normal user
      // Otherwise use the appropriate key for their role
      if (history.items[0] != undefined) {
        key = keys[history.items[0].data];
      } else {
        authChannel.publish("auth-details", "basic");
        key = keys["basic"];
      }
      key = keys["basic"];

      const roleRestrictedClient = new Ably.Rest(key);

      const tokenRequestData = await roleRestrictedClient.auth.createTokenRequest({ clientId: token.body.sub });
      context.res = {
        status: 200,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tokenRequestData)
      };
    },
    true
  );
}
