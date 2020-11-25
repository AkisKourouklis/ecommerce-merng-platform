import { gql } from 'apollo-server-express';
import userTypeDefs from '../Users/users.typeDefs';

const rootTypes = gql`
  type Query {
    hello: String
  }
  type Mutation {
    hello: String
  }
`;

export default [rootTypes, userTypeDefs];
