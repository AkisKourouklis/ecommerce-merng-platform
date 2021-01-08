import { Snackbar, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { AppState } from "../../store/store";
import { ClearNotification } from "./NotificationActions";
import React from "react";

const NotificationAlert: React.FC = ({ children }) => {
  const { notification, notificationType } = useSelector((state: AppState) => state.notification);
  const dispatch = useDispatch();

  // Error handling
  const clearNotification = () => {
    dispatch(ClearNotification());
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={notification != null}
        autoHideDuration={5000}
        onClose={clearNotification}
      >
        <Alert onClose={clearNotification} severity={notificationType}>
          <Typography variant="subtitle2">{notification}</Typography>
        </Alert>
      </Snackbar>
      {children}
    </>
  );
};

export default NotificationAlert;
