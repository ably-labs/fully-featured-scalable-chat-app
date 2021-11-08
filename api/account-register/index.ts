import "../startup";
import * as Validator from "validatorjs";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { UserService } from "../common/services/UserService";

export type RegistrationForm = { username: string; firstName: string; lastName: string; password: string };
const registrationFormRules = { username: "required|min:1", firstName: "required|min:1", lastName: "required|min:1", password: "required|min:1" };

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const data = { ...req.body } as RegistrationForm;
  const validation = new Validator(data, registrationFormRules);

  if (validation.fails()) {
    context.res = { status: 400, body: JSON.stringify(validation.errors.all()) };
    return;
  }

  const userService = new UserService();
  const { exists } = await userService.getUserByUsername(data.username);

  if (exists) {
    context.res = { status: 400, body: JSON.stringify({ username: ["This username is not available."] }) };
    return;
  }

  const user = await userService.createUser(data);
  const { token, userDetails } = userService.generateLoginMetadataFor(user);
  context.res = { status: 200, body: JSON.stringify({ success: true, reason: "created", token, userDetails }) };
};

export default httpTrigger;
