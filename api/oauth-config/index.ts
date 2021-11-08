import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.res = {
    status: 200,
    body: JSON.stringify({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      client_id: process.env.AUTH0_CLIENTID,
      redirect_uri: process.env.AUTH0_REDIRECT_URI,
    }),
  };
};

export default httpTrigger;
