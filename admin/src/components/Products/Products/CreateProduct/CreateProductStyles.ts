import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  input: {
    marginBottom: theme.spacing(1),
    "& .MuiSvgIcon-root": {
      cursor: "pointer"
    }
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  quill: {
    borderRadius: theme.shape.borderRadius,
    "& .ql-toolbar": {
      borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
    },
    "& .ql-container": {
      borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
      minHeight: "150px"
    }
  }
}));
