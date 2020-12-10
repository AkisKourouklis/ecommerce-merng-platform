export interface NotificationDefaultState {
  notification: string | null;
  notificationType: string;
}
export enum Constants {
  TOGGLE_NOTIFICATION = "TOGGLE_NOTIFICATION",
  CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION"
}

export interface toggleNotificationAction {
  type: typeof Constants.TOGGLE_NOTIFICATION;
  notification: NotificationDefaultState;
}

export interface clearNotificationAction {
  type: typeof Constants.CLEAR_NOTIFICATION;
}

export type NotificationActionTypes = toggleNotificationAction | clearNotificationAction;
