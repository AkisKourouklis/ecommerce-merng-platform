import React from "react";
import { Snackbar, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { AppState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ClearNotification } from "./NotificationActions";

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
        autoHideDuration={8000}
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
