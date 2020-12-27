import { gql } from 'apollo-server-express';

export default gql`
  type Product {
    _id: ID
    name: String
    description: String
    sku: String
    barcode: String
    isActive: Boolean
    quantity: Int
    tax: Int
    images: [ProductImages]
    variants: [ProductVariants]
    tags: [ProductTags]
    price: GeneralPrice
    seo: ProductSeo
    vendor: String
  }

  type SingleProduct {
    _id: ID
    name: String
    description: String
    sku: String
    barcode: String
    isActive: Boolean
    quantity: Int
    tax: Int
    images: [ProductImages]
    variants: [ProductVariants]
    tags: [String]
    price: GeneralPrice
    seo: ProductSeo
    vendor: String
  }

  type ProductVariants {
    _id: String!
    color: String
    material: String
    size: String
    quantity: Int
    sku: String
    barcode: String
    price: GeneralPrice
    images: [ProductImages]
  }

  type ProductTags {
    _id: ID
    name: String
  }

  type ProductImages {
    path: String
    alt: String
    size: Int
  }

  type ProductSeo {
    name: String
    description: String
  }

  type ProductSeoKeywords {
    name: String
  }

  type ProductResult {
    products: [Product]
    currentPage: Int
    totalPages: Int
  }

  input ProductInput {
    _id: ID
    name: String
    description: String
    sku: String
    barcode: String
    isActive: Boolean
    quantity: Int
    tax: Int
    images: [ProductImagesInput]
    variants: [ProductVariantsInput]
    tags: [ProductTagsInput]
    price: GeneralPriceInput
    seo: ProductSeoInput
    vendor: String
  }

  input ProductImagesInput {
    _id: ID
    path: String
    alt: String
    size: Int
  }

  input ProductVariantsInput {
    _id: String
    color: String
    size: String
    material: String
    quantity: Int
    sku: String
    barcode: String
    price: GeneralPriceInput
    images: [ProductImagesInput]
  }

  input ProductTagsInput {
    _id: ID
    name: String
  }

  input ProductSeoInput {
    name: String
    description: String
  }

  input ProductSeoKeywordsInput {
    name: String
  }

  extend type Query {
    findAllProducts(search: String, page: Int, limit: Int): ProductResult
    findProductById(_id: ID): SingleProduct!
  }
  extend type Mutation {
    findProductById(_id: ID!): Product!
    createProduct(productInput: ProductInput): Product!
    editProduct(productInput: ProductInput): Product!
    removeProduct(productInput: ProductInput): Product!
  }
`;
