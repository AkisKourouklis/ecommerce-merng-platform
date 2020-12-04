import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { createLogger } from "redux-logger";
import ErrorReducer from "../components/Error/ErrorReducers";
import { ErrorActionTypes } from "../components/Error/ErrorTypes";

const rootReducer = combineReducers({
  error: ErrorReducer
});

const initState = {
  error: {
    error: null,
    uuid: null
  }
};

export type AppState = ReturnType<typeof rootReducer>;

const logger = createLogger({ collapsed: true });
const middleware = [thunk as ThunkMiddleware<AppState, ErrorActionTypes>, logger];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const storeRedux = createStore(rootReducer, initState, enhancer);

export default storeRedux;
