import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { ApiRequestContext } from "../common/ApiRequestContext";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const ctx = await ApiRequestContext.fromRequest(req);    
    if (!ctx.isAuthenticatedUser) {
        context.res = { status: 401, body: JSON.stringify({ success: false, reason: "Invalid token" })};
        return;
    }

    const data = [
        "channel 1",
        "channel 2"
    ];

    context.res = { status: 200, body: JSON.stringify({ success: true, data })};
    
};

export default httpTrigger;