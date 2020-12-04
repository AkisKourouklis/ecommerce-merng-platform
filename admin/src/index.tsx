import React, { ThemeProvider } from "@material-ui/core";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./config/theme";
import { Provider } from "react-redux";

import "./index.scss";
import storeRedux from "./store/store";

// i need to finished redux error handling

ReactDOM.render(
  <Provider store={storeRedux}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
