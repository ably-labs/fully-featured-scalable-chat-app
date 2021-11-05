import "../startup";
import * as bcrypt from "bcrypt";
import { User } from "../common/metadata/User";
import { JwtGenerator } from "../common/JwtGenerator";
import { CosmosDbMetadataRepository } from "../common/dataaccess/CosmosDbMetadataRepository";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const repository = new CosmosDbMetadataRepository();
    const existing = await repository.getByProperty<User>("User", "username", req.body.username);

    const reason = "Unrecognised username / password combination.";

    if (existing?.length === 0 || req.body.password == "") {
        context.res = { status: 403, body: JSON.stringify({ success: false, reason }) };
        return;
    }

    const user = existing[0];

    const existingPasswordHash = user.passwordHash;
    const match = await bcrypt.compare(req.body.password, existingPasswordHash);

    if (!match) {
        context.res = { status: 403, body: JSON.stringify({ success: false, reason }) };
        return;
    }

    const jwtValidator = JwtGenerator.fromEnvironment();
    const token = jwtValidator.generate(user.id);
    const userDetails = { username: user.username, firstName: user.firstName, lastName: user.lastName };

    context.res = { status: 200, body: JSON.stringify({ success: true, reason: "correct credentials", token, userDetails }) };
};

export default httpTrigger;