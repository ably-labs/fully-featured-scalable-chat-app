import { Types, Realtime } from "ably";

export function getAblyClient(): Types.RealtimePromise {
  const options: Types.ClientOptions = { authUrl: "/api/ably/token-request" };
  const ablyClient = new Realtime.Promise(options);

  return ablyClient;
}

export class UtilityMessagingService {
  private ablyClient: Types.RealtimePromise;
  private utilityChannelName: string = "utility-channel";
  private utilityChannel: Types.RealtimeChannelPromise;

  constructor(ablyClient: Types.RealtimePromise) {
    this.ablyClient = ablyClient;
    this.ablyClient.connection.on("connected", () => {
      this.utilityChannel = this.ablyClient.channels.get(this.utilityChannelName);
    });
  }

  public async handleChannelUsersPresence(message: any) {
    // TODO
    // message contains presence status for all users in a channel
  }

  public async handleSingleUserPresence(message: any) {
    // TODO
    // message contains presence status for only one user
  }

  public async publishMessage(messageName: string, message: any) {
    await this.utilityChannel.publish(messageName, message);
  }

  public async subscribeToMessage(messageName: string, callback: (message: any) => void) {
    this.utilityChannel.subscribe(messageName, callback);
  }
}
