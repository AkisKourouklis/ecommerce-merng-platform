import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  logo: {
    marginBottom: theme.spacing(2)
  },
  container: {
    paddingTop: theme.spacing(10),
    height: "80vh",
    display: "flex",
    alignItems: "center"
  },
  formTitle: {
    marginBottom: theme.spacing(5)
  },
  input: {
    marginBottom: theme.spacing(2)
  },
  submitButton: {
    marginTop: theme.spacing(5)
  },
  card: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3)
  }
}));
