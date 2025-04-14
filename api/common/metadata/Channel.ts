import { Entity } from "../dataaccess/IMetadataRepository";

export enum ChannelVisibility {
  Private = 0,
  Public = 1
}

export interface IChannel extends Entity {
  id: string;
  name: string;
  members: string[];
  description: string;
  isDefault: boolean;
  createdBy: string;
  visibility: ChannelVisibility;
  onlineCount: number;
}

export class Channel implements IChannel, Entity {
  public id: string;
  public readonly type: string;
  public name: string;
  public members: string[];
  public description: string;
  public isDefault: boolean;
  public createdBy: string;
  public visibility: ChannelVisibility;
  public onlineCount: number;

  constructor() {
    this.type = "Channel";
  }

  public static fromJSON(json: any): Channel {
    // Always create Ids
    if (!json.id) {
      json.id = Channel.createId();
    }

    return Object.assign(new Channel(), json);
  }

  public isMember(userId: string): boolean {
    return this.members.includes(userId);
  }

  public incrementOnlineCount(): number {
    this.onlineCount += 1;

    return this.onlineCount;
  }

  public decrementOnlineCount(): number {
    this.onlineCount -= 1;

    return this.onlineCount;
  }

  private static createId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
