import { CosmosDbMetadataRepository } from "../dataaccess/CosmosDbMetadataRepository";
import { Channel } from "../metadata/Channel";

export type ChannelMetadata = {
  id: string;
  name: string;
  members: string[];
  memberCount: number;
  createdBy: string;
  description: string;
  visibility: string;
};

export class ChannelService {
  private _repo: CosmosDbMetadataRepository;

  public constructor() {
    this._repo = new CosmosDbMetadataRepository();
  }

  public async getChannelById(id: string): Promise<{ exists: boolean; channel?: Channel }> {
    const existing = await this._repo.getByProperty<Channel>("Channel", "id", id);

    if (existing.length > 0) {
      const asChannelType = Object.assign(new Channel(), existing[0]);
      return { exists: true, channel: asChannelType };
    }
    return { exists: false, channel: undefined };
  }

  public async getDefaultChannelsList(): Promise<{ defaultChannelsList?: Channel[] }> {
    const defaultChannelsList = await this._repo.getByProperty<Channel>("Channel", "isDefault", true);
    return { defaultChannelsList: defaultChannelsList };
  }

  public async createChannel(request: ChannelMetadata): Promise<Channel> {
    const channel = Channel.fromJSON(request);
    await this._repo.saveOrUpdate<Channel>(channel);
    return channel;
  }
}
