import update from "immutability-helper";
import actionTypes from "../types";

const initialState = {
  fullname: null,
  email: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  token: null
};

const authStart = (state) => {
  return update(state, {
    loading: { $set: true }
  });
};
const authSuccess = (state, action) => {
  return update(state, {
    loading: { $set: false },
    isAuthenticated: { $set: true },
    email: { $set: action.payload.email },
    username: { $set: action.payload.username },
    token: { $set: action.payload.token }
  });
};
const authFail = (state, action) => {
  return update(state, {
    loading: { $set: false },
    error: { $set: action.payload.error }
  });
};
const authLogout = (state) => {
  return update(state, {
    error: { $set: null },
    isAuthenticated: { $set: false },
    email: { $set: null },
    username: { $set: null },
    token: { $set: null }
  });
};
const clearError = (state) => {
  return update(state, {
    error: { $set: null },
    loading: { $set: false }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.AUTH_CLEAR_ERROR:
      return clearError(state);
    default:
      return state;
  }
};

export default reducer;
