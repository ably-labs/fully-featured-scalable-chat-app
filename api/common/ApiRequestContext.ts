import { CosmosDbMetadataRepository } from "./dataaccess/CosmosDbMetadataRepository";
import { validateJwt } from "./JwtGenerator";
import { IUser, User } from "./metadata/User";

export class ApiRequestContext {

    public isAuthenticatedUser: boolean;
    public User: IUser;

    public static async fromRequest(request: any) {
        const packedJwt = request?.headers?.authorization || "";
        const jwtText = packedJwt.replace("Bearer ", "");
        const { success, token } = validateJwt(jwtText);

        if (!success) {
            return ApiRequestContext.invalid();
        }

        const userId = (token as any).userId;
        const repository = new CosmosDbMetadataRepository();        
        const existing = await repository.getByProperty<User>("User", "id", userId)[0];
        return ApiRequestContext.knownUser(existing);
    }

    public static invalid() {        
        const ctx = new ApiRequestContext();
        ctx.isAuthenticatedUser = false;
        return ctx; 
    }

    public static knownUser(user: IUser) {
        const ctx = new ApiRequestContext();
        ctx.isAuthenticatedUser = true;
        ctx.User = user
        return ctx;
    }
}

