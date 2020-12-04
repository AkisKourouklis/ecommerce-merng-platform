import { createContext } from "react";
import { AuthContextProps } from "./AuthTypes";

export const AuthContext = createContext<AuthContextProps>({
  auth: {
    isAuthenticated: false,
    error: null,
    id: null,
    fullname: null,
    token: null
  },
  setAuth: () => void 0
});
