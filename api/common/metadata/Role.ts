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
}