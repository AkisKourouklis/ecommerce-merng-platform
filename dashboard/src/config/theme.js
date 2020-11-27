import { createMuiTheme, makeStyles } from "@material-ui/core";

export default createMuiTheme({
  typography: {
    fontFamily: ["-apple-system", "Roboto", "sans-serif"].join(","),
    button: {
      textTransform: "none",
      fontWeight: "bold"
    }
  }
});

export const authUseStyles = makeStyles(() => ({}));
