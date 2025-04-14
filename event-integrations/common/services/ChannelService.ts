import { CosmosDbMetadataRepository } from "../dataaccess/CosmosDbMetadataRepository";
import { IMetadataRepository } from "../dataaccess/IMetadataRepository";
import { Channel, ChannelVisibility } from "../metadata/Channel";

export type ChannelCreationRequest = {
  channelName: string;
  description: string;
  createdBy: string;
  visibility: ChannelVisibility;
};

export type ChannelDeletionRequest = {
  id: string;
};

export type AddChannelMemberRequest = {
  userId: string;
  channelId: string;
};

export type RemoveChannelMemberRequest = {
  userId: string;
  channelId: string;
};

export class ChannelService {
  private _type = "Channel";
  private _repo: IMetadataRepository;

  public constructor() {
    this._repo = new CosmosDbMetadataRepository();
  }

  public async getChannelByName(channelName: string): Promise<{ exists: boolean; channel?: Channel }> {
    const channels = await this._repo.getByProperty<Channel>(this._type, "name", channelName);

    if (channels.length > 0) {
      return { exists: true, channel: channels[0] };
    }

    return { exists: false, channel: undefined };
  }

  public async getAllChannels(): Promise<{ exists: boolean; channels?: Channel[] }> {
    const channels = await this._repo.getAll<Channel>("Channel");

    if (channels.length > 0) {
      return { exists: true, channels: channels };
    }

    return { exists: false, channels: undefined };
  }

  public async createChannel(request: ChannelCreationRequest): Promise<Channel> {
    const channel = Channel.fromJSON({
      name: request.channelName,
      description: request.description,
      createdBy: request.createdBy,
      visibility: request.visibility
    });
    return await this._repo.saveOrUpdate<Channel>(channel);
  }

  public async deleteChannel(request: ChannelDeletionRequest): Promise<Channel> {
    const channel = Channel.fromJSON({
      id: request.id
    });
    await this._repo.delete<Channel>(channel);
    return channel;
  }

  public async addMember(request: AddChannelMemberRequest): Promise<Channel> {
    const channel = await this._repo.getById<Channel>(this._type, request.channelId);
    if (!channel.members.includes(request.userId)) {
      channel.members.push(request.userId);
      // Can we do partial updates on the members array?
      await this._repo.saveOrUpdate<Channel>(channel);
    }

    return channel;
  }

  public async removeMember(request: RemoveChannelMemberRequest): Promise<Channel> {
    const channel = await this._repo.getById<Channel>(this._type, request.channelId);
    if (channel.members.includes(request.userId)) {
      channel.members.splice(channel.members.indexOf(request.userId), 1);
      await this._repo.saveOrUpdate<Channel>(channel);
    }

    return channel;
  }

  public async updateChannel(channel: Channel): Promise<Channel> {
    await this._repo.saveOrUpdate<Channel>(channel);

    return channel;
  }
}
