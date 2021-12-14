import { HTTPMethod } from "@azure/cosmos";
import * as Ably from "ably/promises";
import { CosmosDbMetadataRepository } from "../dataaccess/CosmosDbMetadataRepository";
import { Role } from "../metadata/Role";
import fetch from 'node-fetch';

export type RoleCreationRequest = {
  name: string;
  permissions: string[];
};

export class RoleService {
  private _repo: CosmosDbMetadataRepository;

  public constructor() {
    this._repo = new CosmosDbMetadataRepository();
  }

  public async getRoleByName(name: string): Promise<{ exists: boolean; role?: Role }> {
    const existing = await this._repo.getByProperty<Role>("Role", "name", name);

    if (existing.length > 0) {
      const asRoleType = Object.assign(new Role(), existing[0]);
      return { exists: true, role: asRoleType };
    }
    return { exists: false };
  }

  public async createRole(request: RoleCreationRequest): Promise<Role> {
    const role = Role.fromRequest(request);
    const { success, key } = await this.createKey(request.name);

    if (!success) {
      return undefined;
    }
    role.apiKey = key;
    await this._repo.saveOrUpdate<Role>(role);
    return role;
  }

  private async createKey(name: string): Promise<{ success: boolean; key?: string }> {
    const url = `https://control.ably.net/v1/apps/${process.env.APP_ID}/keys`;

    const body = JSON.stringify({
      name: name,
      // TODO: Replace with inserted capabilities
      capability: {
        '*': ["publish", "subscribe", "presence"]
      }
    });

    const headers = { 
      "Content-type": "application/json",
      "accept": "application/json",
      "Authorization": "Bearer " + process.env.CONTROL_KEY,
      "Access-Control-Allow-Origin": "*"
    };

    const response = await fetch(url, {method: 'POST', body, headers });
    if (response.status != 201) {
      return { success: false };
    }
    const responseJson = await response.json();
    const key = responseJson["key"];

    return { success: !!key, key };
  }
}
