import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosDbMetadataRepository } from "./dataaccess/CosmosDbMetadataRepository";
import { JwtGenerator } from "./JwtGenerator";
import { IUser, User } from "./metadata/User";

export class ApiRequestContext {

    public isAuthenticatedUser: boolean;
    public user: IUser;

    public reason: string;

    constructor(isAuthenicatedUser: boolean = false, user: IUser = null, reason: string = null) {
        this.isAuthenticatedUser = isAuthenicatedUser;
        this.user = user;
        this.reason = reason;
    }

    public static async fromRequest(req: any, includeUser: boolean = true): Promise<ApiRequestContext> {
        const jwtValidator = JwtGenerator.fromEnvironment();

        const packedJwt = req.headers.jwt || "";
        if (packedJwt.length === 0) {
            return new ApiRequestContext(false, null, "Token missing from request headers");
        }
        const { success, token } = jwtValidator.validate(packedJwt);

        if (!success) {
            return new ApiRequestContext(false, null, "Token failed to validate");
        }

        if (includeUser) {
            const userId = token.body["userId"];
            const repository = new CosmosDbMetadataRepository();
            const existing = await repository.getByProperty<User>("User", "id", userId)[0];
            return new ApiRequestContext(true, existing, "Valid");
        }

        return new ApiRequestContext(true, null, "Valid");
    }
}

export const authorized: AzureFunction = async function (context: Context, req: HttpRequest, wrappedFunction): Promise<void> {
    const ctx = await ApiRequestContext.fromRequest(req);
    if (!ctx.isAuthenticatedUser) {
        context.res = { status: 401, body: JSON.stringify({ success: false, reason: ctx.reason }) };
        return;
    }

    wrappedFunction(ctx);

};

