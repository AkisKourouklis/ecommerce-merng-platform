import React, { useEffect, useState, lazy, Suspense } from "react";
import { AUTH_CHECK } from "./components/Authentication/AuthQuery";
import { AuthContext } from "./components/Authentication/AuthContext";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import GraphqlRequest from "./graphql/graphql-request";
import LoadingPage from "./components/Loading/LoadingPage";
import Login from "./components/Authentication/Login";
import usePersistedState from "./customHooks/usePersistedState";
import NotFound from "./components/404/404";

const Home = lazy(() => import("./components/Home/Home"));
const Products = lazy(() => import("./components/Products/Products/Products"));
const ProductsCreate = lazy(() => import("./components/Products/Products/CreateProduct/CreateProduct"));
const ProductsTags = lazy(() => import("./components/Products/Tags/Tags"));
const ProductsVariants = lazy(() => import("./components/Products/Variants/Variants"));

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
              <Route path="/products/products" component={Products} />
              <Route path="/products/products/create" component={ProductsCreate} />
              <Route path="/products/tags" component={ProductsTags} />
              <Route path="/products/variants" component={ProductsVariants} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
