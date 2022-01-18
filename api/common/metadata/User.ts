import * as bcrypt from "bcrypt";
import { Entity } from "../dataaccess/IMetadataRepository";

export interface IUser extends Entity {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  oauthSub: string;
  profileImgUrl: string;
  roleName: string;
  email: string;
}

export class User implements IUser, Entity {
  public id: string;
  public readonly type: string;

  public username: string;
  public firstName: string;
  public lastName: string;
  public passwordHash: string;
  public oauthSub: string;
  public profileImgUrl: string;
  public roleName: string;
  public email: string;

  constructor() {
    this.type = "User";
  }

  public async passwordMatches(suppliedClearTextPassword: string): Promise<boolean> {
    return await bcrypt.compare(suppliedClearTextPassword, this.passwordHash);
  }

  public static fromJSON(json: any): User {
    // Always create user Ids
    if (!json.id) {
      json.id = User.createId();
    }

    // Always hash and remove clearText passwords
    if (json.password) {
      const hashed = bcrypt.hashSync(json.password, 10);
      json.passwordHash = hashed;
      delete json.password;
    }

    // Always default passwordHashes
    if (!json.passwordHash) {
      json.passwordHash = "";
    }

    return Object.assign(new User(), json);
  }

  private static createId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
