import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const rootReducer = combineReducers({});

const initState = {};

const logger = createLogger({ collapsed: true });
const middleware = [thunk, logger];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const storeRedux = createStore(rootReducer, initState, enhancer);

export default storeRedux;
