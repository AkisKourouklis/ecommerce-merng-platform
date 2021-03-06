import { gql } from "graphql-request";

export const FIND_ALL_PRODUCTS = gql`
  query($search: String) {
    findAllProducts(search: $search) {
      products {
        _id
        name
        sku
        barcode
        description
        seo {
          name
          description
        }
        isActive
        price {
          price
          costPrice
        }
        images {
          path
          alt
        }
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
    $vendor: String
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
        vendor: $vendor
      }
    ) {
      _id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation(
    $_id: ID
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
    $vendor: String
  ) {
    editProduct(
      productInput: {
        _id: $_id
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
        price: $price
        seo: $seo
        vendor: $vendor
      }
    ) {
      _id
    }
  }
`;

export const FIND_SINGLE_PRODUCT = gql`
  query($_id: ID) {
    findProductById(_id: $_id) {
      _id
      name
      description
      sku
      barcode
      isActive
      quantity
      vendor
      tax
      images {
        _id
        path
        alt
      }
      variants {
        _id
        sku
        barcode
        color
        material
        size
        quantity
        price {
          price
          comparePrice
          costPrice
        }
      }
      tags
      price {
        comparePrice
        price
        costPrice
      }
      seo {
        name
        description
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation($_id: ID) {
    removeProduct(productInput: { _id: $_id }) {
      _id
    }
  }
`;
