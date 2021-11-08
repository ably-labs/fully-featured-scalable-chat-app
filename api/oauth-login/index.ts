import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosDbMetadataRepository } from "../common/dataaccess/CosmosDbMetadataRepository";
import { User } from "../common/metadata/User";
import { JwtGenerator } from "../common/JwtGenerator";
import { AuthenticationClient } from "auth0";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  var auth0 = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENTID,
    client_id: process.env.AUTH0_CLIENTID,
    redirect_uri: process.env.AUTH0_REDIRECT_URI,
  });

  try {
    const data = await auth0.getProfile(req.body.token);

    const repository = new CosmosDbMetadataRepository();
    const existing = await repository.getByProperty<User>("User", "oauthSub", data.sub);

    if (existing?.length != 0) {
      const user = existing[0];

      const { token, userDetails } = tokenAndDetailsFor(user);
      context.res = { status: 200, body: JSON.stringify({ success: true, reason: "logged in", token, userDetails }) };
      return;
    }

    const username = data.email; // This'll do for now, but we should let the user change this later.
    const user = User.fromOAuthResult(username, data);
    await repository.saveOrUpdate<User>(user);

    const { token, userDetails } = tokenAndDetailsFor(user);
    context.res = { status: 200, body: JSON.stringify({ success: true, reason: "created", token, userDetails }) };
  } catch (err) {
    context.res = { status: 403, body: JSON.stringify({ success: false, err }) };
  }
};

function tokenAndDetailsFor(user: User) {
  const jwtValidator = JwtGenerator.fromEnvironment();
  const token = jwtValidator.generate(user.id);
  const userDetails = { username: user.username, firstName: user.firstName, lastName: user.lastName };
  return { token, userDetails };
}

export default httpTrigger;
