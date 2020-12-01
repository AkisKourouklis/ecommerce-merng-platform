import { gql } from 'apollo-server-express';

export default gql`
  type Error {
    _id: ID
    uuid: String
    error: String
  }

  input ErrorInput {
    uuid: String
    error: String
  }
  extend type Mutation {
    graphqlError(error: ErrorInput!): Error!
  }
`;
