import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authentication.reducers";

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer)
});

const initState = {
  auth: {
    fullname: null,
    email: null,
    id: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    token: null
  }
};

const logger = createLogger({ collapsed: true });
const middleware = [thunk, logger];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

export const storeRedux = createStore(rootReducer, initState, enhancer);
export const persistor = persistStore(storeRedux);
