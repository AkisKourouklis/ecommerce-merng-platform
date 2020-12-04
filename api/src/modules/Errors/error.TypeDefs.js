import { gql } from 'apollo-server-express';

export default gql`
  type ErrorsResult {
    errors: [Error]
    currentPage: Int
    totalPages: Int
  }

  type Error {
    _id: ID
    uuid: String
    error: String
  }

  input ErrorInput {
    uuid: String
    error: String
  }
  extend type Query {
    findAllErrors(search: String, page: Int, limit: Int): ErrorsResult!
  }
  extend type Mutation {
    graphqlError(error: ErrorInput!): Error!
  }
`;
