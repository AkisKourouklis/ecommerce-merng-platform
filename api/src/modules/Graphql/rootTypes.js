import { gql } from 'apollo-server-express';
import userTypeDefs from '../Users/users.typeDefs';
import imagesTypeDefs from '../Images/images.typeDefs';

const rootTypes = gql`
  type GeneralPrice {
    comparePrice: Int
    price: Int
    costPrice: Int
  }
  input GeneralPriceInput {
    comparePrice: Int
    price: Int
    costPrice: Int
  }

  type Query {
    hello: String
  }
  type Mutation {
    hello: String
  }
`;

export default [rootTypes, userTypeDefs, imagesTypeDefs];
