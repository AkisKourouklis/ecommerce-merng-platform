import { useState, useEffect } from "react";
import Cookie from "js-cookie";

export default (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const persistedState = Cookie.get(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });
  useEffect(() => {
    Cookie.set(key, state);
  }, [state, key]);
  return [state, setState];
};
