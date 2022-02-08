import { CosmosDbMetadataRepository } from "../dataaccess/CosmosDbMetadataRepository";
import { ChannelPresence } from "../metadata/ChannelPresence";
import { PresenceStatus } from "../metadata/PresenceStatus";

export type ChannelPresenceCreationRequest = {
  username: string;
  channelName: string;
  userPresence: PresenceStatus;
};

export type ChannelPresenceDeletionRequest = {
  id: string;
  username: string;
  channelName: string;
};

export type ChannelPresenceUpdateRequest = {
  id: string;
  username: string;
  channelName: string;
  userPresence: PresenceStatus;
};

export class ChannelPresenceService {
  private _repo: CosmosDbMetadataRepository;
  private _containerName: string = "ChannelPresence";

  public constructor() {
    this._repo = new CosmosDbMetadataRepository();
  }

  public async getPresenceByUsername(username: string): Promise<{ exists: boolean; channelPresence?: ChannelPresence }> {
    const existing = await this._repo.getByProperty<ChannelPresence>(this._containerName, "username", username);

    if (existing.length > 0) {
      return { exists: true, channelPresence: existing[0] };
    }

    return { exists: false, channelPresence: undefined };
  }

  public async getPresenceByChannelName(channelName: string): Promise<{ exists: boolean; channelPresence?: ChannelPresence[] }> {
    const existing = await this._repo.getByProperty<ChannelPresence>(this._containerName, "channelName", channelName);

    if (existing.length > 0) {
      return { exists: true, channelPresence: existing };
    }

    return { exists: false, channelPresence: undefined };
  }

  public async createChannelPresence(request: ChannelPresenceCreationRequest): Promise<ChannelPresence> {
    const channelPresence = ChannelPresence.fromJSON(request);
    await this._repo.saveOrUpdate<ChannelPresence>(channelPresence);
    return channelPresence;
  }

  public async updateChannelPresence(request: ChannelPresenceUpdateRequest): Promise<ChannelPresence> {
    const channelPresence = ChannelPresence.fromJSON(request);
    await this._repo.saveOrUpdate<ChannelPresence>(channelPresence);
    return channelPresence;
  }

  public async deleteChannelPresence(request: ChannelPresenceDeletionRequest): Promise<ChannelPresence> {
    const channelPresence = ChannelPresence.fromJSON(request);
    await this._repo.delete<ChannelPresence>(channelPresence);
    return channelPresence;
  }
}
