import update from "react-addons-update";
import { ErrorDefaultState, Constants, ErrorActionTypes } from "./ErrorTypes";

const initialState = {
  error: null,
  uuid: null
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toggleError = (state: ErrorDefaultState, action: any) => {
  return update(state, {
    error: { $set: action.error },
    uuid: { $set: action.uuid }
  });
};
const clearError = (state: ErrorDefaultState) => {
  return update(state, {
    error: { $set: null },
    uuid: { $set: null }
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const reducer = (state: ErrorDefaultState = initialState, action: ErrorActionTypes) => {
  switch (action.type) {
    case Constants.TOGGLE_ERROR:
      return toggleError(state, action);
    case Constants.CLEAR_ERROR:
      return clearError(state);
    default:
      return state;
  }
};

export default reducer;
