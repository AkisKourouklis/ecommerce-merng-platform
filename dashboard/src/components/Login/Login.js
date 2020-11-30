import React, { useState } from "react";
import {
  Container,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Box
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import useStyles from "./Login.styles";

export default () => {
  const { handleSubmit, register } = useForm();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setLoading(false);
    setError(false);
    console.log(values);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography className={classes.formTitle} variant="h5">
              Παρακαλώ συνδεθείτε
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="email"
                inputRef={register}
                label="Όνομα χρήστη"
                type="text"
                className={classes.input}
                variant="outlined"
                fullWidth
              />

              <TextField
                name="password"
                inputRef={register}
                label="Κωδικός πρόσβασης"
                type="password"
                className={classes.input}
                variant="outlined"
                fullWidth
              />
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={error != null}
                autoHideDuration={4000}
                onClose={clearError}
              >
                <Alert onClose={clearError} severity="error">
                  {error === "User not exists"
                    ? "Αυτό ο χρήστης δεν υπάρχει."
                    : error === "Passwords don't match"
                    ? "Ο κωδικός πρόσβασης είναι λάθος."
                    : null}
                </Alert>
              </Snackbar>
              <Box display="inline-block">
                <a href="/forgot-password">
                  <Typography variant="subtitle1">Ξέχασα τον κωδικό μου.</Typography>
                </a>
              </Box>
              <Button
                startIcon={loading ? <CircularProgress color="inherit" size="20px" /> : null}
                className={classes.authentication}
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Σύνδεση
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
