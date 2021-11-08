import "../startup";
import * as Validator from "validatorjs";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { UserService } from "../common/services/UserService";
import { badRequest, forbidden, ok } from "../common/http/CommonResults";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const validation = new Validator(req.body, { username: "required|min:1", password: "required|min:1" });

  if (validation.fails()) {
    context.res = badRequest(validation);
    return;
  }

  const userService = new UserService();

  const { exists, user } = await userService.getUserByUsername(req.body.username);
  const passwordMatches = await user.passwordMatches(req.body.password);

  if (!exists || !passwordMatches) {
    context.res = forbidden("unrecognised username / password combination.");
    return;
  }

  const metadata = userService.generateLoginMetadataFor(user);
  context.res = ok("correct credentials", metadata);
};

export default httpTrigger;
