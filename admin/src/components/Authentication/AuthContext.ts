import { AuthContextProps } from "./AuthTypes";
import { createContext } from "react";

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
