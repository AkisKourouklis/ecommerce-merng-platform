import { Constants, ErrorActionTypes, ErrorDefaultState, createErrorProp } from "./ErrorTypes";
import { Dispatch } from "react";
import { GRAPHQL_ERROR } from "./ErrorQuery";
import GraphqlRequest from "../../graphql/graphql-request";
import { v4 as uuid } from "uuid";

const toggleError = (error: ErrorDefaultState): ErrorActionTypes => ({
  type: Constants.TOGGLE_ERROR,
  error
});

const clearErrorAction = (): ErrorActionTypes => ({
  type: Constants.CLEAR_ERROR
});

export const CreateError = (data: createErrorProp) => {
  return async (dispatch: Dispatch<ErrorActionTypes>): Promise<void> => {
    try {
      const newUuid = uuid();
      await GraphqlRequest(data.token).request(GRAPHQL_ERROR, { error: JSON.stringify(data), uuid: newUuid });
      dispatch(toggleError({ error: JSON.stringify(data), uuid: newUuid }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const ClearError = () => {
  return (dispatch: Dispatch<ErrorActionTypes>): void => {
    dispatch(clearErrorAction());
  };
};
