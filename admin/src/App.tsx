import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import usePersistedState from "./customHooks/usePersistedState";
import Login from "./components/Authentication/Login";
import { AuthContext } from "./components/Authentication/AuthContext";
import GraphqlRequest from "./graphql/graphql-request";
import { AUTH_CHECK } from "./components/Authentication/AuthQuery";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [auth, setAuth] = usePersistedState("auth", {
    isAuthenticated: false,
    error: null,
    id: null,
    fullname: null,
    token: null
  });

  const checkIfTokenIsValid = async (): Promise<void> => {
    try {
      const { token } = auth;

      await GraphqlRequest().request(AUTH_CHECK, { token: `Bearer ${token}` });
      setLoading(false);
    } catch (err) {
      setAuth({ isAuthenticated: false, error: null, id: null, fullname: null, token: null });
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIfTokenIsValid();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Router>
            <Switch>
              {!auth.isAuthenticated ? (
                <>
                  <Redirect to="/login" />
                  <Route exact path="/login" component={Login} />
                </>
              ) : (
                <>
                  <Redirect to="/home" />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/products" component={Products} />
                </>
              )}
            </Switch>
          </Router>
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default App;
