import React, { useEffect, useState, lazy, Suspense } from "react";
import { AUTH_CHECK } from "./components/Authentication/AuthQuery";
import { AuthContext } from "./components/Authentication/AuthContext";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import GraphqlRequest from "./graphql/graphql-request";
import LoadingPage from "./components/Loading/LoadingPage";
import Login from "./components/Authentication/Login";
import usePersistedState from "./customHooks/usePersistedState";

const Home = lazy(() => import("./components/Home/Home"));
const Products = lazy(() => import("./components/Products/Products"));

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
        <LoadingPage />
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
                  <Suspense fallback={<LoadingPage />}>
                    <Redirect to="/home" />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/products" component={Products} />
                  </Suspense>
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
