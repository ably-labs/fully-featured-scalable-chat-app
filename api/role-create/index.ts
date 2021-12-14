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
      const data = { ...req.body } as RoleCreateForm;

      const validation = new Validator(data, roleCreateFormRules);

      if (validation.fails()) {
        context.res = badRequest(validation);
        return;
      }

      const roleService = new RoleService();
      let { exists } = await roleService.getRoleByName(data.name);

      if (exists) {
        context.res = badRequestFor({
          name: ["This name is not available."]
        });
        return;
      }

      const role = await roleService.createRole(data);
      if (!role) {
        context.res = {
          status: 500,
          body: JSON.stringify({ success: false, reason: "Internal error creating role" })
        };
        return;
      }

      context.res = ok("created");
    },
    "admin"
  );
}

export type RoleCreateForm = {
  name: string;
  permissions: string[];
};

const roleCreateFormRules = {
  name: "required|min:1",
  permissions: "required|min:1"
};
