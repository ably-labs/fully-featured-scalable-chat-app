import { PresenceStatus } from "./PresenceStatus";

export type UserPresenceMessage = {
  userId: string;
  lastOnlineTimeStampUTC: Date;
  presenceStatus: PresenceStatus;
};
