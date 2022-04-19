import * as bcrypt from "bcrypt";
import { Entity } from "../dataaccess/IMetadataRepository";
import { PresenceStatus } from "./PresenceStatus";

export interface IUser extends Entity {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  oauthSub: string;
  profileImgSmallUrl: string;
  profileImgLargeUrl: string;
  roleName: string;
  email: string;
  presenceStatus: PresenceStatus;
  lastOnlineTimeStampUTC: Date;
}

export class User implements IUser, Entity {
  public id: string;
  public readonly type: string;

  public username: string;
  public firstName: string;
  public lastName: string;
  public passwordHash: string;
  public oauthSub: string;
  public profileImgSmallUrl: string;
  public profileImgLargeUrl: string;
  public roleName: string;
  public email: string;
  public presenceStatus: PresenceStatus;
  public lastOnlineTimeStampUTC: Date;

  constructor() {
    this.type = "User";
    this.roleName = "default";
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

  public getOnlineStatus(currentDateTime?: Date): PresenceStatus {
    const threshold = 1000 * 60 * 5; // 5 minutes
    const current = currentDateTime !== undefined ? currentDateTime.valueOf() : Date.now();
    return current - this.lastOnlineTimeStampUTC.valueOf() < threshold ? PresenceStatus.Online : PresenceStatus.Offline;
  }

  private static createId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
