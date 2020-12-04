import { gql } from "graphql-request";

export const GRAPHQL_ERROR = gql`
  mutation($error: String!, $uuid: String!) {
    graphqlError(error: { uuid: $uuid, error: $error }) {
      _id
      uuid
      error
    }
  }
`;
