import React, { Suspense, lazy, useEffect } from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AUTH_CHECK } from "./components/Authentication/AuthQuery";
import { AuthContext } from "./components/Authentication/AuthContext";
import GraphqlRequest from "./graphql/graphql-request";
import LoadingPage from "./components/Loading/LoadingPage";
import Login from "./components/Authentication/Login";
import NotFound from "./components/404/404";
import usePersistedState from "./customHooks/usePersistedState";

const Home = lazy(() => import("./components/Home/Home"));
const Products = lazy(() => import("./components/Products/Products/Products"));
const ProductsCreate = lazy(() => import("./components/Products/Products/CreateProduct/CreateProduct"));
const ProductsTags = lazy(() => import("./components/Products/Tags/Tags"));
const ProductsVariants = lazy(() => import("./components/Products/Variants/Variants"));

const App: React.FC = () => {
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
    } catch (err) {
      setAuth({ isAuthenticated: false, error: null, id: null, fullname: null, token: null });
    }
  };

  useEffect(() => {
    checkIfTokenIsValid();
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Router>
          <Suspense fallback={<LoadingPage />}>
            <Switch>
              {!auth.isAuthenticated ? (
                <>
                  <Redirect to="/login" />
                  <Route path="/login" component={Login} />
                </>
              ) : null}
              <Route exact path="/home" component={Home} />
              <Route exact path="/products/products" component={Products} />
              <Route exact path="/products/products/create" component={ProductsCreate} />
              <Route exact path="/products/tags" component={ProductsTags} />
              <Route exact path="/products/variants" component={ProductsVariants} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
