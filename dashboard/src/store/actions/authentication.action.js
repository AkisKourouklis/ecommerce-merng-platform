import jwtDecode from "jwt-decode";
import { useMutation } from "@apollo/client";
import actionTypes from "../types";
import { LOGIN } from "../../graphql/authQuery";

const authStart = () => ({
  type: actionTypes.AUTH_START
});
const authSuccess = (data, token) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    fullname: data.fullname,
    email: data.email,
    id: data.id,
    lastActive: data.lastActive,
    organization: data.organization,
    token
  }
});
const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  payload: {
    error
  }
});
const logout = () => ({
  type: actionTypes.AUTH_LOGOUT
});
const clearError = () => ({
  type: actionTypes.AUTH_CLEAR_ERROR
});

export const authClearError = () => {
  return (dispatch) => {
    dispatch(clearError());
  };
};

export const authLogout = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};

export const authLogin = (email, password) => {
  // return async (dispatch) => {
  //   dispatch(authStart());
  //   try {
  //     // here will go apollo-client mutation logic
  //     const jwtdata = jwtDecode(response.login.token);
  //     dispatch(authSuccess(jwtdata, response.login.token));
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(authFail(error.response.errors[0].message));
  //   }
  // };
};
