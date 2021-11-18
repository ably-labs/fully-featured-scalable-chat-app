import { Entity } from "../dataaccess/IMetadataRepository";

export interface IRole extends Entity {
  id: string;
  name: string;
  permissions: string[];
  apiKey: string;
}

export class Role implements IRole, Entity {
    public id: string;
    public readonly type: string;

    public name: string;
    public permissions: string[];
    public apiKey: string;

  constructor() {
    this.type = "Role";
  }

  public static fromRequest(json: any): Role {
    // Always create role ID
    if (!json.id) {
      json.id = Role.createId();
    }

    return Object.assign(new Role(), json);
  }

  private static createId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
