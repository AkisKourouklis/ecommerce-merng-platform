import { gql } from 'apollo-server-express';

export default gql`
  type Cart {
    _id: ID
    uuid: String
    products: [CartProduct]
  }

  type CartProduct {
    productId: String
    name: String
    description: String
    quantity: String
    sku: String
    barcode: String
    color: String
    material: String
    size: String
    weight: String
    price: GeneralPrice
    images: [GeneralImage]
    tags: [Tags]
  }

  type CartResults {
    categories: [Cart]
    currentPage: Int
    totalPages: Int
  }

  input CartInput {
    _id: ID
    uuid: String
    products: [CartProductInput]
  }

  input CartProductInput {
    _id: ID
    productId: String
    name: String
    description: String
    quantity: Int
    sku: String
    barcode: String
    color: String
    material: String
    size: String
    weight: Int
    price: GeneralPriceInput
    images: [GeneralImageInput]
    tags: [TagInfo]
  }

  extend type Query {
    cartFindAll(search: String, page: Int, limit: Int): CartResults
    cartFindByUuid(uuid: String): Cart
  }
  extend type Mutation {
    cartCreate(data: CartInput!): Cart!
    cartEdit(data: CartInput!): Cart!
    cartAddProducts(_id: ID!, data: [CartProductInput]!): String
    cartRemoveProducts(_id: ID!, data: [CartProductInput]!): String
  }
`;
