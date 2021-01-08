import React, { Suspense, lazy, useEffect } from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AUTH_CHECK } from "./components/Authentication/AuthQuery";
import { AuthContext } from "./components/Authentication/AuthContext";
import Categories from "./components/Categories/Categories";
import GraphqlRequest from "./graphql/graphql-request";
import Home from "./components/Home/Home";
import LoadingPage from "./components/Loading/LoadingPage";
import Login from "./components/Authentication/Login";
import NotFound from "./components/404/404";
import Products from "./components/Products/Products/Products";
import usePersistedState from "./customHooks/usePersistedState";

const ProductsCreate = lazy(() => import("./components/Products/Products/CreateProduct/CreateProduct"));
const EditProduct = lazy(() => import("./components/Products/Products/EditProduct/EditProduct"));
const ProductsTags = lazy(() => import("./components/Products/Tags/Tags"));
const ProductsVariants = lazy(() => import("./components/Products/Variants/Variants"));
const CategoryCreate = lazy(() => import("./components/Categories/CreateCategory/CreateCategory"));
const CategoryEdit = lazy(() => import("./components/Categories/EditCategory/EditCategory"));

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
              <Route exact path="/products/products/edit/:_id" component={EditProduct} />
              <Route exact path="/products/tags" component={ProductsTags} />
              <Route exact path="/products/variants" component={ProductsVariants} />
              <Route exact path="/categories" component={Categories} />
              <Route exact path="/categories/create" component={CategoryCreate} />
              <Route exact path="/categories/edit/:_id" component={CategoryEdit} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
