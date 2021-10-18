import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";
import * as Ably from "ably/promises";

const client = new Ably.Realtime(process.env.ABLY_API_KEY);

export default async function (context: Context, req: HttpRequest): Promise<void> {
    await authorized(context, req, async ({ user }: ApiRequestContext) => {

        const tokenRequestData = await client.auth.createTokenRequest({ clientId: user.id });
        context.res = {
            headers: { "content-type": "application/json" },
            body: JSON.stringify(tokenRequestData)
        };

    });
};