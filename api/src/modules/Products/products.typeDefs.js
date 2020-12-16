import { gql } from 'apollo-server-express';

export default gql`
  type Product {
    _id: ID
    name: String
    description: String
    sku: String
    barcode: String
    availability: String
    isActive: Boolean
    quantity: Int
    tax: Int
    images: [ProductImages]
    variants: [ProductVariants]
    tags: [ProductTags]
    price: GeneralPrice
    seo: ProductSeo
  }

  type ProductVariants {
    _id: String!
    color: String
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
    keywords: [ProductSeoKeywords]
    image: String
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
    availability: String
    quantity: Int
    tax: Int
    images: [ProductImagesInput]
    variants: [ProductVariantsInput]
    tags: [ProductTagsInput]
    price: GeneralPriceInput
    seo: ProductSeoInput
  }

  input ProductImagesInput {
    _id: ID
    path: String
    alt: String
    size: Int
  }

  input ProductVariantsInput {
    _id: String!
    color: String
    size: String
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
    keywords: [ProductSeoKeywordsInput]
    image: String
  }

  input ProductSeoKeywordsInput {
    name: String
  }

  input ProductFilters {
    color: [String]
    size: [String]
    availability: [String]
  }

  extend type Query {
    findAllProducts(search: String, page: Int, limit: Int): ProductResult
  }
  extend type Mutation {
    findProductById(_id: ID!): Product!
    createProduct(productInput: ProductInput): Product!
    editProduct(productInput: ProductInput): Product!
    removeProduct(productInput: ProductInput): Product!
  }
`;
