import { useContext, useState } from "react";
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
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import decode from "jwt-decode";
import useStyles from "./Login.styles";
import { AuthContext } from "../Context/Context";
import GraphQlRquest from "../../graphql/graphql-request";
import { AUTH_LOGIN } from "./authQuery";

export default () => {
  const { handleSubmit, register } = useForm();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const clearError = () => {
    setAuth({ isAuthenticated: false, error: null, id: null, fullname: null, token: null });
  };

  const onSubmit = async (values) => {
    setLoading(false);
    clearError();
    try {
      const { email, password } = values;

      const response = await GraphQlRquest().request(AUTH_LOGIN, { email, password });

      const decoded = decode(response.login.token);
      setAuth({
        isAuthenticated: true,
        error: null,
        id: decoded.id,
        fullname: decoded.fullname,
        token: response.login.token
      });
    } catch (err) {
      setAuth({ isAuthenticated: false, error: err.response.errors[0].message, id: null, fullname: null, token: null });
    }
  };

  return (
    <>
      {auth.isAuthenticated ? (
        <Redirect to="/login" />
      ) : (
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
                  open={auth.error != null}
                  autoHideDuration={4000}
                  onClose={clearError}
                >
                  <Alert onClose={clearError} severity="error">
                    {auth.error === "User not exists"
                      ? "Αυτό ο χρήστης δεν υπάρχει."
                      : auth.error === "Passwords don't match"
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
      )}
    </>
  );
};
