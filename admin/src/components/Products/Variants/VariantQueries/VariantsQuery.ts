import { gql } from "graphql-request";

export const FETCH_VARIANTS = gql`
  query($search: String, $page: Int, $limit: Int) {
    findAllVariants(search: $search, page: $page, limit: $limit) {
      variants {
        _id
        sku
        size
        color
        material
        quantity
        price {
          comparePrice
          price
          costPrice
        }
        barcode
        images {
          _id
          alt
          path
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
    $productId: ID
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
        productId: $productId
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

export const CREATE_MULTIPLE_VARIANTS = gql`
  mutation($variants: [CreateVariant]) {
    createMultipleVariants(variantInput: $variants) {
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

export const REMOVE_IMAGE_FROM_VARIANT = gql`
  mutation($imageId: String, $variantId: String) {
    removeImageFromVariant(imageId: $imageId, variantId: $variantId) {
      _id
    }
  }
`;

export const FIND_VARIANT_BY_ID = gql`
  query($variantId: String) {
    findVariantById(variantId: $variantId) {
      _id
      size
      color
      material
      price {
        price
        comparePrice
        costPrice
      }
      quantity
      sku
      barcode
      images {
        _id
        alt
        path
      }
    }
  }
`;

export const ADD_IMAGE_TO_VARIANT = gql`
  mutation($files: [Upload], $variantId: ID) {
    addImageToVariant(files: $files, variantId: $variantId) {
      path
      alt
      _id
    }
  }
`;

export const UPDATE_VARIANT = gql`
  mutation(
    $size: String
    $color: String
    $material: String
    $price: GeneralPriceInput
    $quantity: Int
    $sku: String
    $barcode: String
    $variantId: ID
  ) {
    updateVariant(
      variantInput: {
        size: $size
        color: $color
        material: $material
        price: $price
        quantity: $quantity
        sku: $sku
        barcode: $barcode
        variantId: $variantId
      }
    ) {
      _id
    }
  }
`;

export const DELETE_VARIANT = gql`
  mutation($variantId: ID) {
    deleteVariant(variantId: $variantId) {
      updatedProduct {
        _id
      }
      removedVariant {
        _id
      }
    }
  }
`;
