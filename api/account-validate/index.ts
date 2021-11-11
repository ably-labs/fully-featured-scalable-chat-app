import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { authorized } from "../common/ApiRequestContext";
import { ok } from "../common/http/CommonResults";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await authorized(context, req, () => {
    context.res = ok("token valid");
  });
};

export default httpTrigger;
