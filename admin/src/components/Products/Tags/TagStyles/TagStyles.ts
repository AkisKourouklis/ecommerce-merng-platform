import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: "600px"
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  input: {
    marginBottom: theme.spacing(1)
  },
  innerPaper: {
    padding: theme.spacing(2)
  },
  transferListPaper: {
    width: 200,
    height: 230,
    overflow: "auto"
  },
  tagDeleteButtonOutlined: {
    marginLeft: theme.spacing(1),
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`
  },
  tagDeleteButtonContained: {
    marginLeft: theme.spacing(1),
    color: "white",
    background: theme.palette.error.main
  }
}));
