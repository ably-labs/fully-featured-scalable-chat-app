import "../startup";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { RoleService } from "../common/services/RoleService";
import { authorized } from "../common/ApiRequestContext";
import { etagFor, etagMatches, notFound, notModified, ok } from "../common/http/CommonResults";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(context, req, async () => {
    const roleService = new RoleService();
    const { exists, role } = await roleService.getRoleByName(req.params.roleName);

    if (!exists) {
      context.res = notFound("Role not found");
      return;
    }

    if (etagMatches(role, req.headers["If-None-Match"])) {
      context.res = notModified();
      return;
    }

    const { id, name } = role;
    const response = { id, name };

    context.res = ok("success", response, { etag: etagFor(role) });
  });
};

export default httpTrigger;
