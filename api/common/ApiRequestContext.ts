import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosDbMetadataRepository } from "./dataaccess/CosmosDbMetadataRepository";
import { JwtGenerator } from "./JwtGenerator";
import { IUser, User } from "./metadata/User";
import { UserService } from "./services/UserService";

export class ApiRequestContext {
  public isAuthenticatedUser: boolean;
  public user: IUser;

  public reason: string;

  constructor(isAuthenticatedUser = false, user: IUser = null, reason: string = null) {
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

    if (includeUser) {
      const userId = token.body["userId"];

      const repository = new CosmosDbMetadataRepository();
      const existing = await repository.getByProperty<User>("User", "id", userId);
      return new ApiRequestContext(true, existing[0], "Valid");
    }

    return new ApiRequestContext(true, null, "Valid");
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

  if (
    permission !== "any" &&
    ctx.user != null &&
    ctx.user.username != null &&
    !(await hasPermission(ctx.user.username, context, permission))
  ) {
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

async function hasPermission(username: string, context: Context, permission: string): Promise<boolean> {
  const userService = new UserService();
  const { exists, role } = await userService.getRoleByUsername(username);

  if (!exists) {
    context.res = {
      status: 401,
      body: JSON.stringify({ success: false, reason: "User does not exist" })
    };
    return false;
  }

  if (!role.permissions.includes(permission)) {
    context.res = {
      status: 401,
      body: JSON.stringify({ success: false, reason: "User does not have permission to access resource" })
    };
    return false;
  }

  return true;
}
