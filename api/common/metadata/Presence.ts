export enum PresenceStatus {
  Offline = 0,
  Online = 1
}

export type UserPresenceMessage = {
  userId: string;
  presence: PresenceStatus;
};
