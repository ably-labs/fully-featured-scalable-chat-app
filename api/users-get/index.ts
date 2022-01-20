import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { UserService } from "../common/services/UserService";
import { authorized } from "../common/ApiRequestContext";
import { etagFor, etagMatches, notFound, notModified, ok } from "../common/http/CommonResults";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(
    context,
    req,
    async ({ userId: callingUserId }) => {
      const userService = new UserService();
      const { exists, user } = await userService.getUserById(req.params.userId);

      if (!exists) {
        context.res = notFound("User not found");
        return;
      }

      if (etagMatches(user, req.headers["If-None-Match"])) {
        context.res = notModified();
        return;
      }

      const { id, username, firstName, lastName, profileImgSmallUrl, profileImgLargeUrl } = user;
      const response = { id, username, firstName, lastName, profileImgSmallUrl, profileImgLargeUrl };

      if (callingUserId === id) {
        // Add extra stuff if the user is requesting their own profile
      }

      context.res = ok("success", response, { etag: etagFor(user) });
    },
    undefined,
    true
  );
};

export default httpTrigger;
