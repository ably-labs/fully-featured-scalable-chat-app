import { Types } from "ably";
import { useChannel } from "@ably-labs/react-hooks";
import { PresenceStatus } from "../../../api/common/metadata/PresenceStatus";
import { UserPresenceMessage } from "../../../api/common/metadata/UserPresenceMessage";

export const UserPresenceMessageName = "user-presence";

export class UserPresenceService {
  private userChannelPrefix: string = "user-presence-";
  private userChannel: Types.RealtimeChannelCallbacks;
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
    this.userChannel = useChannel(`${this.userChannelPrefix}-${userId}`, () => {})[0];
  }

  public setPresenceToOnline() {
    let message: UserPresenceMessage = {
      userId: this.userId,
      lastOnlineTimeStampUTC: new Date(),
      presenceStatus: PresenceStatus.Online
    };
    this.userChannel.publish(UserPresenceMessageName, message);
  }

  public setPresenceToOffline() {
    let message: UserPresenceMessage = {
      userId: this.userId,
      lastOnlineTimeStampUTC: new Date(),
      presenceStatus: PresenceStatus.Offline
    };
    this.userChannel.publish(UserPresenceMessageName, message);
  }
}
