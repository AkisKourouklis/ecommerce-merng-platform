import { Constants, NotificationActionTypes, NotificationDefaultState } from "./NotificationTypes";
import { Dispatch } from "react";

const toggleNotification = ({ notification, notificationType }: NotificationDefaultState): NotificationActionTypes => ({
  type: Constants.TOGGLE_NOTIFICATION,
  notification: { notification, notificationType }
});

const clearNotificationAction = (): NotificationActionTypes => ({
  type: Constants.CLEAR_NOTIFICATION
});

export const CreateNotification = ({ notification, notificationType }: NotificationDefaultState) => {
  return async (dispatch: Dispatch<NotificationActionTypes>): Promise<void> => {
    try {
      dispatch(toggleNotification({ notification, notificationType }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const ClearNotification = () => {
  return (dispatch: Dispatch<NotificationActionTypes>): void => {
    dispatch(clearNotificationAction());
  };
};
