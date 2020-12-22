import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  tabs: {
    borderRadius: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2)
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
  },
  innerPaper: {
    padding: theme.spacing(2)
  }
}));
