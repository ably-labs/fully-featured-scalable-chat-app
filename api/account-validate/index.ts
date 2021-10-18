import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { authorized } from "../common/ApiRequestContext";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    await authorized(context, req, () => {
        context.res = { status: 200, body: JSON.stringify({ success: true, reason: "Token valid" }) };
    });
};

export default httpTrigger;