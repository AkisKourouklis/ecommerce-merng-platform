import React from "react";
import { Snackbar, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { ClearError } from "./ErrorActions";

const Error: React.FC = ({ children }) => {
  const { error } = useSelector((state: AppState) => state.error);
  const dispatch = useDispatch();

  // Error handling
  const clearError = () => {
    dispatch(ClearError());
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={error != null}
        autoHideDuration={8000}
        onClose={clearError}
      >
        <Alert onClose={clearError} severity="error">
          <Typography noWrap>
            <b>Παρακαλώ καταγράψτε τον κωδικό του λάθους:</b> {error?.uuid}
          </Typography>
          <Typography variant="subtitle2">{error?.error}</Typography>
        </Alert>
      </Snackbar>
      {children}
    </>
  );
};

export default Error;
