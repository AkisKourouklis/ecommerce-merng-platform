import { useState } from "react";
import { Snackbar, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import Alert from "@material-ui/lab/Alert";
import { ErrorContext } from "../Context/Context";

export default ({ children }) => {
  const [error, setError] = useState(null);

  // Error handling
  const clearError = () => {
    setError(null);
  };

  const createError = (err) => {
    const newuuid = uuidv4();

    const newError = {
      error: err,
      uuid: newuuid
    };

    // here i need to call a mutation to save the error on the backend
    setError(newError);
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
      <ErrorContext.Provider value={{ error, createError, clearError }}>{children}</ErrorContext.Provider>
    </>
  );
};
