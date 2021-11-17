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
      const { exists, role } = await userService.getRoleByUsername(user.username);

      if (!exists) {
        context.res = {
          status: 422,
          body: JSON.stringify({
            success: false,
            reason: "Authorized, but could not identify role"
          })
        };
        return;
      }

      const client = new Ably.Rest(role.apiKey);

      const tokenRequestData = await client.auth.createTokenRequest({ clientId });
      context.res = {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tokenRequestData)
      };
    },
    true
  );
}
