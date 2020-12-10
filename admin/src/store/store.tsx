import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { createLogger } from "redux-logger";
import ErrorReducer from "../components/Error/ErrorReducers";
import { ErrorActionTypes } from "../components/Error/ErrorTypes";
import NotificationReducer from "../components/Notification/NotificationReducers";
import { NotificationActionTypes } from "../components/Notification/NotificationTypes";

const rootReducer = combineReducers({
  error: ErrorReducer,
  notification: NotificationReducer
});

const initState = {
  error: {
    error: null,
    uuid: null
  },
  notification: {
    notification: null,
    notificationType: "info"
  }
};

export type AppState = ReturnType<typeof rootReducer>;

const logger = createLogger({ collapsed: true });
const middleware = [thunk as ThunkMiddleware<AppState, ErrorActionTypes, NotificationActionTypes>, logger];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const storeRedux = createStore(rootReducer, initState, enhancer);

export default storeRedux;
