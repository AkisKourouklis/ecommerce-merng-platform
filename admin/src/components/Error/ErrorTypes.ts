export interface ErrorDefaultState {
  error: string | null;
  uuid?: string | null;
}
export enum Constants {
  TOGGLE_ERROR = "TOGGLE_ERROR",
  CLEAR_ERROR = "CLEAR_ERROR"
}

export interface toggleErrorAction {
  type: typeof Constants.TOGGLE_ERROR;
  error: ErrorDefaultState;
}

export interface clearErrorAction {
  type: typeof Constants.CLEAR_ERROR;
}

export interface createErrorProp {
  errors: [{ message: string }];
  token: string;
}
export type ErrorActionTypes = toggleErrorAction | clearErrorAction;
