import { Entity } from "../dataaccess/IMetadataRepository";

export interface IChannel extends Entity {
  id: string;
  name: string;
  members: string[];
  memberCount: number;
  createdBy: string;
  description: string;
  visibility: string;
}

export class Channel implements IChannel, Entity {
  public id: string;
  public readonly type: string;

  public name: string;
  public members: string[];
  public memberCount: number;
  public createdBy: string;
  public description: string;
  public visibility: string;

  constructor() {
    this.type = "Channel";
  }

  public static fromJSON(json: any): Channel {
    // Always create user Ids
    if (!json.id) {
      json.id = Channel.createId();
    }

    return Object.assign(new Channel(), json);
  }

  private static createId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
