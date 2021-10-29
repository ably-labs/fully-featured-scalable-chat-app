import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as Ably from "ably/promises";

const ablyRestClient = new Ably.Rest(process.env.ABLY_API_KEY);

export default async function (context: Context, req: HttpRequest): Promise<void> {
  const tokenRequestData = await ablyRestClient.auth.createTokenRequest({});
  context.res = {
    status: 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ tokenRequestData })
  };
}
