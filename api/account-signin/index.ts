import "../startup";
import * as Validator from "validatorjs";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { UserService } from "../common/services/UserService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const validation = new Validator(req.body, { username: "required|min:1", password: "required|min:1" });

  if (validation.fails()) {
    context.res = { status: 400, body: JSON.stringify(validation.errors.all()) };
    return;
  }

  const userService = new UserService();

  const { exists, user } = await userService.getUserByUsername(req.body.username);
  const passwordMatches = await user.passwordMatches(req.body.password);

  if (!exists || !passwordMatches || req.body.password == "") {
    const reason = "Unrecognised username / password combination.";
    context.res = { status: 403, body: JSON.stringify({ success: false, reason }) };
    return;
  }

  const { token, userDetails } = userService.generateLoginMetadataFor(user);
  context.res = { status: 200, body: JSON.stringify({ success: true, reason: "correct credentials", token, userDetails }) };
};

export default httpTrigger;
