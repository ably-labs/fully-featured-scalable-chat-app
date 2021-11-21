import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { authorized } from "../common/ApiRequestContext";
import { UserService } from "../common/services/UserService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(
    context,
    req,
    async () => {
      const userId = req.body.userId;
      const userService = new UserService();
      const { user } = await userService.getUserById(userId);

      const { username, firstName, lastName, profileImgUrl } = user;
      const shareableUserDetails = { username, firstName, lastName, profileImgUrl };

      context.res = {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(shareableUserDetails)
      };
    },
    true
  );
};

export default httpTrigger;
