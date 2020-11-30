import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { useSelector } from "react-redux";
import client from "./graphql/apollo-graphql";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return isAuthenticated ? <Redirect to="/home" /> : <Redirect to="/login" />;
              }}
            />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/products" component={Products} />
          </Switch>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
