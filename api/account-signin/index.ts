import "../startup";
import * as bcrypt from "bcrypt";
import { User } from "../common/metadata/User";
import { generateJwt } from "../common/JwtGenerator";
import { CosmosDbMetadataRepository } from "../common/dataaccess/CosmosDbMetadataRepository";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const repository = new CosmosDbMetadataRepository();
    const existing = await repository.getByProperty<User>("User", "username", req.body.username);

    const reason = "Unrecognised username / password combination.";

    if (existing?.length === 0) {
        context.res = { status: 403, body: JSON.stringify({ success: false, reason })};
        return;
    }

    const userRecord = existing[0];
    const existingPasswordHash = userRecord.passwordHash;
    const match = await bcrypt.compare(req.body.password, existingPasswordHash);

    if (!match) { 
        context.res = { status: 403, body: JSON.stringify({ success: false, reason })};
        return;
    }

    const token = generateJwt(userRecord.id);
    const userDetails = { username: userRecord.username, firstName: userRecord.firstName, lastName: userRecord.lastName };

    context.res = { status: 200, body: JSON.stringify({ success: true, reason: "correct credentials", token, userDetails })};
};

export default httpTrigger;