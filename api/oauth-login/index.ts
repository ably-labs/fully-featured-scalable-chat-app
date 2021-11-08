import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { AuthenticationClient } from "auth0";
import { UserService } from "../common/services/UserService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  var auth0 = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENTID,
    client_id: process.env.AUTH0_CLIENTID,
    redirect_uri: process.env.AUTH0_REDIRECT_URI,
  });

  const userService = new UserService();

  try {
    const data = await auth0.getProfile(req.body.token);

    const { exists, user } = await userService.getUserByOAuthSubscription(data.sub);

    if (exists) {
      const { token, userDetails } = userService.generateLoginMetadataFor(user);
      context.res = { status: 200, body: JSON.stringify({ success: true, reason: "logged in", token, userDetails }) };
      return;
    }

    const newUser = await userService.createUser({
      username: data.email,
      firstName: data.given_name,
      lastName: data.family_name,
      oauthSub: data.sub,
    });

    const { token, userDetails } = userService.generateLoginMetadataFor(newUser);
    context.res = { status: 200, body: JSON.stringify({ success: true, reason: "created", token, userDetails }) };
  } catch (err) {
    context.res = { status: 403, body: JSON.stringify({ success: false, err }) };
  }
};

export default httpTrigger;
