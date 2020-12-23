import { Constants, NotificationActionTypes, NotificationDefaultState } from "./NotificationTypes";
import update from "react-addons-update";

const initialState = {
  notification: null,
  notificationType: "info"
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleNotification = (state: NotificationDefaultState, action: any) => {
  return update(state, {
    notification: { $set: action.notification.notification },
    notificationType: { $set: action.notification.notificationType }
  });
};
const clearNotification = (state: NotificationDefaultState) => {
  return update(state, {
    notification: { $set: null }
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const reducer = (state: NotificationDefaultState = initialState, action: NotificationActionTypes) => {
  switch (action.type) {
    case Constants.TOGGLE_NOTIFICATION:
      return toggleNotification(state, action);
    case Constants.CLEAR_NOTIFICATION:
      return clearNotification(state);
    default:
      return state;
  }
};

export default reducer;
