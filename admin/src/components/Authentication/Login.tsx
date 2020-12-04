import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import GraphqlRequest from "../../graphql/graphql-request";
import { AuthContext } from "./AuthContext";
import { AUTH_LOGIN } from "./AuthQuery";
import { AuthLoginProps, AuthProps } from "./AuthTypes";
import decode from "jwt-decode";
import LoginStyles from "./LoginStyles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { auth, setAuth } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const classes = LoginStyles();

  const clearError = (): void => {
    setAuth({ isAuthenticated: false, error: null, id: null, fullname: null, token: null });
  };

  const onSubmit = async (values: AuthLoginProps): Promise<void> => {
    setLoading(false);
    clearError();
    try {
      const { email, password } = values;

      const response = await GraphqlRequest().request(AUTH_LOGIN, { email, password });

      const decoded: AuthProps = decode(response.login.token);
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

export default Login;
