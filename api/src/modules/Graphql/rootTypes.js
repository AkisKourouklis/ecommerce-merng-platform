import { gql } from 'apollo-server-express';
import userTypeDefs from '../Users/users.typeDefs';
import imagesTypeDefs from '../Images/images.typeDefs';
import variantsTypeDefs from '../Variants/variants.typeDefs';
import tagsTypeDefs from '../Tags/tags.typeDefs';
import productTypeDefs from '../Products/products.typeDefs';
import errorTypeDefs from '../Errors/error.TypeDefs';

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

export default [
  rootTypes,
  userTypeDefs,
  imagesTypeDefs,
  variantsTypeDefs,
  tagsTypeDefs,
  productTypeDefs,
  errorTypeDefs
];
