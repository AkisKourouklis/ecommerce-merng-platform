import { GraphQLClient } from "graphql-request";
import { apiUrl } from "../config/vars";

export default (token) => {
  return new GraphQLClient(apiUrl.uri, {
    headers: {
      authorization: `Bearer ${token || null}`
    }
  });
};
