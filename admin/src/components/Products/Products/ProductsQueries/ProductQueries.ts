import { gql } from "graphql-request";

export const FIND_ALL_PRODUCTS = gql`
  {
    findAllProducts {
      products {
        _id
        name
        sku
      }
    }
  }
`;
