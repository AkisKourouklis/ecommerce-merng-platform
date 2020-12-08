import { gql } from "graphql-request";

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
      }
      totalPages
      currentPage
    }
  }
`;

export const CREATE_VARIANT = gql`
  mutation(
    $size: String
    $color: String
    $material: String
    $price: GeneralPriceInput
    $quantity: Int
    $sku: String!
    $barcode: String
    $images: [ImageInput]
  ) {
    createVariant(
      variantInput: {
        size: $size
        color: $color
        material: $material
        price: $price
        quantity: $quantity
        sku: $sku
        barcode: $barcode
        images: $images
      }
    ) {
      _id
      size
      color
      material
      price {
        comparePrice
        price
        costPrice
      }
      quantity
      sku
      barcode
      images {
        _id
        alt
        path
        size
      }
    }
  }
`;
