import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    secondary: {
      main: "#e18424",
      light: "#E48F3A",
      dark: "#E48F3A"
    },
    primary: {
      main: "#1264B0",
      light: "#1573CB",
      dark: "#115EA6"
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: ["-apple-system", "Roboto", "sans-serif"].join(","),
    button: {
      textTransform: "none",
      fontWeight: "bold"
    }
  }
});
