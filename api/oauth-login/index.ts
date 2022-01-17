import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { AuthenticationClient } from "auth0";
import { UserService } from "../common/services/UserService";
import { ok, forbidden } from "../common/http/CommonResults";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const auth0 = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    client_id: process.env.AUTH0_CLIENTID,
    redirect_uri: process.env.AUTH0_REDIRECT_URI
  });

  const userService = new UserService();

  try {
    const data = await auth0.getProfile(req.body.token);

    const { exists, user } = await userService.getUserByOAuthSubscription(data.sub);

    if (exists) {
      const metadata = userService.generateLoginMetadataFor(user);
      context.res = ok("logged in", metadata);
      return;
    }

    const newUser = await userService.createUser({
      username: data.email,
      firstName: data.given_name,
      lastName: data.family_name,
      oauthSub: data.sub
    });

    const metadata = userService.generateLoginMetadataFor(newUser);

    context.res = ok("created", metadata);
  } catch (err) {
    context.res = forbidden();
  }
};

export default httpTrigger;
