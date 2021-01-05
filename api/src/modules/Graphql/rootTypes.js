import { gql } from 'apollo-server-express';
import userTypeDefs from '../Users/users.typeDefs';
import imagesTypeDefs from '../Images/images.typeDefs';
import variantsTypeDefs from '../Variants/variants.typeDefs';
import tagsTypeDefs from '../Tags/tags.typeDefs';
import productTypeDefs from '../Products/products.typeDefs';
import errorTypeDefs from '../Errors/error.TypeDefs';
import categoryTypeDefs from '../Categories/category.typeDefs';
import cartTypeDefs from '../Cart/cart.typeDefs';
import checkoutTypeDefs from '../Checkout/checkout.typeDefs';
import customerTypeDefs from '../Customers/customer.typeDefs';

const rootTypes = gql`
  type GeneralPrice {
    comparePrice: Float
    price: Float
    costPrice: Float
  }
  input GeneralPriceInput {
    comparePrice: Float
    price: Float
    costPrice: Float
  }
  type GeneralImage {
    path: String
    alt: String
  }
  input GeneralImageInput {
    path: String
    alt: String
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
  errorTypeDefs,
  categoryTypeDefs,
  cartTypeDefs,
  checkoutTypeDefs,
  customerTypeDefs
];
