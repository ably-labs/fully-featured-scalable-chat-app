import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as nJwt from "njwt";

export const authorized: AzureFunction = async function (context: Context, req: HttpRequest, wrappedFunction, includeUser: boolean = true): Promise<void> {
  try {
    const verifiedJwt = nJwt.verify(req.headers.jwt, process.env.JWT_SIGNING_KEY);
    wrappedFunction(verifiedJwt);
  } catch (err) {
    context.res = { status: 401, body: JSON.stringify({ success: false, reason: err }) };
    return;
  }
};
