import "../startup";
import { Context, HttpRequest } from "@azure/functions";

export default async function (context: Context, req: HttpRequest): Promise<void> {
  context.res = {
    status: 200,
    body: JSON.stringify({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      client_id: process.env.AUTH0_CLIENTID,
      redirect_uri: process.env.AUTH0_REDIRECT_URI,
    }),
  };
}
