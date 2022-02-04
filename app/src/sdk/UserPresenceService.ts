import { Types } from "ably";
import { useChannel } from "@ably-labs/react-hooks";
import { UserPresenceMessage, PresenceStatus } from "../../../api/common/metadata/Presence";

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
      presence: PresenceStatus.Online
    };
    this.userChannel.publish(UserPresenceMessageName, message);
  }

  public setPresenceToOffline() {
    let message: UserPresenceMessage = {
      userId: this.userId,
      presence: PresenceStatus.Offline
    };
    this.userChannel.publish(UserPresenceMessageName, message);
  }
}
