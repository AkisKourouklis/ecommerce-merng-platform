import { gql } from 'apollo-server-express';

export default gql`
  type OrderResults {
    orders: [Order]
    currentPage: Int
    totalPages: Int
  }

  type Order {
    _id: ID
    uuid: String
    products: [CartProduct]
    customer: Customer
  }

  type Customer {
    firstname: String
    lastname: String
    email: String
    phone: Phone
    country: String
    city: String
    state: String
    address: String
    notes: String
    price: customerPrice
  }

  type customerPrice {
    price: Float
    comparePrice: Float
    paid: Float
  }

  type Phone {
    code: Int
    number: String
  }

  input OrderInput {
    _id: ID
    uuid: String
    products: [CartProductInput]
    customer: CustomerInput
  }

  input CustomerPriceInput {
    price: Float
    comparePrice: Float
    paid: Float
  }

  input PhoneInput {
    code: Int
    number: String
  }

  input CustomerInput {
    firstname: String
    lastname: String
    email: String
    phone: PhoneInput
    country: String
    city: String
    state: String
    address: String
    notes: String
    price: CustomerPriceInput
  }

  extend type Query {
    orderFindAll(search: String, page: Int, limit: Int): [OrderResults]
  }
  extend type Mutation {
    orderCreate(data: OrderInput!): Order!
    orderUpdate(data: OrderInput!): Order!
    orderDelete(_id: ID!): Order!
    orderAddProducts(_id: ID!, data: [CartProductInput]!): String
    orderRemoveProducts(_id: ID!, data: [CartProductInput]!): String
  }
`;
