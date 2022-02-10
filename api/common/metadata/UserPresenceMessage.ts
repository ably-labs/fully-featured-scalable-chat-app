import { PresenceStatus } from "./PresenceStatus";

export type UserPresenceMessage = {
  userId: string;
  presence: PresenceStatus;
};
