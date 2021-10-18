import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";

export default async function (context: Context, req: HttpRequest): Promise<void> {
    authorized(context, req, (authContext: ApiRequestContext) => {

        const data = [
            "channel 1",
            "channel 2"
        ];

        context.res = { status: 200, body: JSON.stringify({ success: true, data }) };
    });
};
