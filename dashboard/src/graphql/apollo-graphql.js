import { ApolloClient, InMemoryCache } from "@apollo/client";
import { apiUrl } from "../config/vars";

export default new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache()
});
