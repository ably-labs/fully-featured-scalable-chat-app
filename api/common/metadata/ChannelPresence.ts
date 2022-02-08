import { Entity } from "../dataaccess/IMetadataRepository";
import { PresenceStatus } from "./PresenceStatus";

export interface IChannelPresence extends Entity {
  id: string;
  channelName: string;
  username: string;
  userStatus: PresenceStatus;
}

export class ChannelPresence implements IChannelPresence, Entity {
  public id: string;
  public readonly type: string;

  public channelName: string;
  public username: string;
  public userStatus: PresenceStatus;

  constructor() {
    this.type = "ChannelPresence";
  }

  public static fromJSON(json: any): ChannelPresence {
    // Always create Ids
    if (!json.id) {
      json.id = ChannelPresence.createId();
    }

    return Object.assign(new ChannelPresence(), json);
  }

  private static createId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
