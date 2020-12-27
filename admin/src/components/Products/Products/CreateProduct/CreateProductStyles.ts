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
    marginBottom: theme.spacing(5)
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
  },
  imageDeleteButton: {
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`
  },
  gridList: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));
