import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosDbMetadataRepository } from "./dataaccess/CosmosDbMetadataRepository";
import { JwtGenerator } from "./JwtGenerator";
import { IUser, User } from "./metadata/User";

export class ApiRequestContext {
  public isAuthenticatedUser: boolean;
  public user: IUser;
  public roleName: string;

  public reason: string;

  constructor(isAuthenticatedUser = false, user: IUser = null, reason: string = null, roleName: string = null) {
    this.isAuthenticatedUser = isAuthenticatedUser;
    this.user = user;
    this.reason = reason;
  }

  public static async fromRequest(req: any, includeUser = false): Promise<ApiRequestContext> {
    const jwtValidator = JwtGenerator.fromEnvironment();

    const packedJwt = req.headers.jwt || "";
    if (packedJwt.length === 0) {
      return new ApiRequestContext(false, null, "Token missing from request headers");
    }
    const { success, token } = jwtValidator.validate(packedJwt);

    if (!success) {
      return new ApiRequestContext(false, null, "Token failed to validate");
    }

    const roleName = token.body["roleName"];

    if (includeUser) {
      const userId = token.body["userId"];

      const repository = new CosmosDbMetadataRepository();
      const existing = await repository.getByProperty<User>("User", "id", userId);
      return new ApiRequestContext(true, existing[0], "Valid", roleName);
    }

    return new ApiRequestContext(true, null, "Valid", roleName);
  }
}

export const authorized: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  wrappedFunction,
  permission = "any",
  includeUser = false
): Promise<void> {
  const ctx = await ApiRequestContext.fromRequest(req, includeUser);

  if (!ctx.isAuthenticatedUser) {
    context.res = {
      status: 401,
      body: JSON.stringify({ success: false, reason: ctx.reason })
    };
    return;
  }

  if (permission !== "any" && !(ctx.roleName == permission)) {
    context.res = {
      status: 403,
      body: JSON.stringify({
        success: false,
        reason: "Authorized, but missing permission for action"
      })
    };
    return;
  }

  // In case a response is not set in the callback, we indicate Not Implemented
  context.res = {
    status: 501,
    body: JSON.stringify({
      success: false,
      reason: "Authorized, but no response set"
    })
  };

  await wrappedFunction(ctx);
};
