import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { validateJwt } from "../common/JwtGenerator";
import { CosmosDbMetadataRepository } from "../common/dataaccess/CosmosDbMetadataRepository";
import { User } from "../common/metadata/User";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const packedJwt = req.headers.authorization;
    const jwtText = packedJwt.replace("Bearer ", "");
    const { success, token } = validateJwt(jwtText);

    if (!success) {
        context.res = { status: 401, body: JSON.stringify({ success: false, reason: "Token failed to validate" })};
        return;
    }

    context.res = { status: 200, body: JSON.stringify({ success: true, reason: "Token valid" })};
};

export default httpTrigger;