import { gql } from "graphql-request";

// eslint-disable-next-line import/prefer-default-export
export const FETCH_VARIANTS = gql`
  query fetchVariants($search: String, $page: Int, $limit: Int) {
    findAllVariants(search: $search, page: $page, limit: $limit) {
      variants {
        _id
        sku
        size
        color
        material
        price {
          comparePrice
          price
          costPrice
        }
        barcode
        images {
          _id
        }
        images {
          _id
        }
      }
      totalPages
      currentPage
    }
  }
`;
