import { Box, Snackbar, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { AppState } from "../../store/store";
import { ClearError } from "./ErrorActions";
import React from "react";

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
          <Box style={{ width: "100%", maxWidth: "500px" }}>
            <Typography>
              <b>Παρακαλώ καταγράψτε τον κωδικό του λάθους:</b> {error?.uuid}
            </Typography>
            <Typography noWrap variant="subtitle2">
              {error?.error}
            </Typography>
          </Box>
        </Alert>
      </Snackbar>
      {children}
    </>
  );
};

export default Error;
