import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";
import * as Ably from "ably/promises";

export default async function (context: Context, req: HttpRequest): Promise<void> {
    //await authorized(context, req, async (authContext: ApiRequestContext) => {

    const client = new Ably.Realtime(process.env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'temp' });
    context.res = {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tokenRequestData)
    };

    //}, false);
};