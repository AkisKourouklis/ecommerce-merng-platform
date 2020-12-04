/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect } from "react";
import Cookie from "js-cookie";

const usePersistedState = (key: string, defaultValue: any) => {
  const [state, setState] = useState(() => {
    const persistedState = Cookie.get(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });
  useEffect(() => {
    Cookie.set(key, state);
  }, [state, key]);
  return [state, setState];
};

export default usePersistedState;
