import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    maxWidth: "600px"
  },
  innerPaper: {
    padding: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  input: {
    marginBottom: theme.spacing(1)
  },
  variantDeleteButtonOutlined: {
    marginLeft: theme.spacing(1),
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`
  },
  variantDeleteButtonContained: {
    marginLeft: theme.spacing(1),
    color: "white",
    background: theme.palette.error.main
  },
  imageDeleteButton: {
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`
  }
}));
