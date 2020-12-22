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
  Container,
  LinearProgress,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateError } from "../Error/ErrorActions";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { auth, setAuth } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const classes = LoginStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const clearError = (): void => {
    setAuth({ isAuthenticated: false, error: null, id: null, fullname: null, token: null });
  };

  const onSubmit = async (values: AuthLoginProps): Promise<void> => {
    try {
      clearError();
      setLoading(true);
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
      setLoading(false);
      history.push("/home");
    } catch (err) {
      setAuth({ isAuthenticated: false, error: err.response.errors[0].message, id: null, fullname: null, token: null });
      dispatch(CreateError({ errors: err.response.errors[0].message, token: auth.token || "Bearer " }));
      setLoading(false);
    }
  };

  return (
    <>
      <Container className={classes.container} maxWidth="sm">
        <Card className={classes.card} variant="elevation" elevation={5}>
          {loading ? (
            <div style={{ width: "100%" }}>
              <LinearProgress color="primary" />
            </div>
          ) : null}

          <CardContent>
            <Box className={classes.logo} textAlign="center">
              <img alt="sovrakofanela.gr" src="logo.svg" width="200px" />
            </Box>
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
              {auth.isAuthenticated ? (
                <Button size="large" type="submit" variant="outlined" color="secondary" fullWidth href="/home">
                  Go to Admin
                </Button>
              ) : (
                <Button size="large" type="submit" variant="contained" color="primary" fullWidth>
                  Σύνδεση
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Login;
