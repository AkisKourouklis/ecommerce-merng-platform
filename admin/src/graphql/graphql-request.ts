import { GraphQLClient } from "graphql-request";
import { apiUrl } from "../config/vars";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GraphqlRequest = (token?: string | null): any => {
  return new GraphQLClient(apiUrl.uri, {
    headers: {
      authorization: `Bearer ${token || null}`
    }
  });
};

export default GraphqlRequest;
