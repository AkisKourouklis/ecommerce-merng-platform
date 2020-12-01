import { createContext } from "react";

// eslint-disable-next-line import/prefer-default-export
export const AuthContext = createContext({ token: null, email: null, _id: null });
export const ErrorContext = createContext({ error: null });
