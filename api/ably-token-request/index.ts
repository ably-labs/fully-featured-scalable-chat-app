import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";
import * as Ably from "ably/promises";
import { UserService } from "../common/services/UserService";

export default async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(
    context,
    req,
    async ({ user }: ApiRequestContext) => {
      const clientId = `${user.id}:${user.username}:${encodeURIComponent(user.profileImgUrl)}`;
      
      const userService = new UserService();
      const { role } = await userService.getRoleByUsername(user.username);

      const apiKey = role ? role.apiKey : process.env.ABLY_API_KEY;
      const client = new Ably.Rest(apiKey);

      const tokenRequestData = await client.auth.createTokenRequest({ clientId });
      context.res = {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tokenRequestData)
      };
    },
    true
  );
}
