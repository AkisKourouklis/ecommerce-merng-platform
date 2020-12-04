export interface AuthContextProps {
  auth: {
    isAuthenticated: boolean;
    error: string | null;
    id: string | null;
    fullname: string | null;
    token: string | null;
  };
  setAuth: (auth: AuthProps) => void;
}

export interface AuthProps {
  isAuthenticated: boolean;
  error: string | null;
  id: string | null;
  fullname: string | null;
  token: string | null;
}

export interface AuthLoginProps {
  email: string;
  password: string;
}
