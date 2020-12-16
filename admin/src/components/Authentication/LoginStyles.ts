import { makeStyles } from "@material-ui/core/styles";

const LoginStyles = makeStyles((theme) => ({
  logo: {
    marginBottom: theme.spacing(2)
  },
  container: {
    marginTop: theme.spacing(7)
  },
  formTitle: {
    marginBottom: theme.spacing(5)
  },
  input: {
    marginBottom: theme.spacing(2)
  },
  submitButton: {
    marginTop: theme.spacing(5)
  }
}));

export default LoginStyles;
