import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import { AuthContext } from "./components/Context/Context";
import usePersistedState from "./customHooks/usePersistedState";
import { AUTH_CHECK } from "./components/Login/authQuery";
import graphqlRequest from "./graphql/graphql-request";

function App() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = usePersistedState("auth", {
    isAuthenticated: false,
    error: null,
    id: null,
    fullname: null,
    token: null
  });

  useEffect(async () => {
    async function checkIfTokenIsValid() {
      try {
        const { token } = auth;
        await graphqlRequest().request(AUTH_CHECK, { token: `Bearer ${token}` });
        setLoading(false);
      } catch (err) {
        setAuth({ isAuthenticated: false, error: null, id: null, fullname: null, token: null });
        setLoading(false);
        // i need to redirect user if error
        history.push("/login");
      }
    }

    checkIfTokenIsValid();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </AuthContext.Provider>
  );
}

export default App;
