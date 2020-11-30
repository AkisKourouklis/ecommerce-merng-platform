import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: "http://localhost:5001/graphql/v1",
  cache: new InMemoryCache()
});
