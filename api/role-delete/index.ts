import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";
import * as Validator from "validatorjs";
import { badRequest, badRequestFor, ok } from "../common/http/CommonResults";
import { RoleService } from "../common/services/RoleService";

export default async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(
    context,
    req,
    async () => {
      const data = { ...req.body } as RoleDeleteForm;
      const validation = new Validator(data, roleDeleteFormRules);

      if (validation.fails()) {
        context.res = badRequest(validation);
        return;
      }

      const roleService = new RoleService();
      const { exists, role } = await roleService.getRoleByName(data.name);

      if (!exists) {
        context.res = badRequestFor({
          name: ["Role does not exist."]
        });
        return;
      }

      const successfullyDeleted = await roleService.deleteRole(role);
      if (!successfullyDeleted) {
        context.res = {
          status: 500,
          body: JSON.stringify({ success: false, reason: "Internal error deleting role" })
        };
        return;
      }

      context.res = ok("deleted");
    },
    "admin"
  );
}

export type RoleDeleteForm = {
  name: string;
};

const roleDeleteFormRules = {
  name: "required|min:1"
};
