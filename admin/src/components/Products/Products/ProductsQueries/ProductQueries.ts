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

export const CREATE_PRODUCT = gql`
  mutation(
    $name: String
    $description: String
    $sku: String
    $barcode: String
    $isActive: Boolean
    $quantity: Int
    $tax: Int
    $images: [ProductImagesInput]
    $variants: [ProductVariantsInput]
    $tags: [ProductTagsInput]
    $seo: ProductSeoInput
    $price: GeneralPriceInput
  ) {
    createProduct(
      productInput: {
        name: $name
        description: $description
        sku: $sku
        barcode: $barcode
        isActive: $isActive
        quantity: $quantity
        tax: $tax
        images: $images
        variants: $variants
        tags: $tags
        seo: $seo
        price: $price
      }
    ) {
      _id
    }
  }
`;
