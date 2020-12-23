import "./index.scss";
import React, { ThemeProvider } from "@material-ui/core";
import App from "./App";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import storeRedux from "./store/store";
import theme from "./config/theme";

// i need to finished redux error handling

ReactDOM.render(
  <Provider store={storeRedux}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
