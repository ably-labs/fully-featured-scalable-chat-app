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
      const data = { ...req.body } as RoleEditForm;
      const validation = new Validator(data, roleEditFormRules);

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

      const success = await roleService.editRole(role, data.permissions);
      if (!success) {
        context.res = {
          status: 500,
          body: JSON.stringify({ success: false, reason: "Internal error editing role" })
        };
        return;
      }

      context.res = ok("created");
    },
    "admin"
  );
}

export type RoleEditForm = {
  name: string;
  permissions: string[];
};

const roleEditFormRules = {
  name: "required|min:1",
  permissions: "required|min:1"
};
