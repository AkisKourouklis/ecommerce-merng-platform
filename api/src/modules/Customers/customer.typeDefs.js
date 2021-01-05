import { gql } from 'apollo-server-express';

export default gql`
  type CustomerResults {
    customers: [Order]
    currentPage: Int
    totalPages: Int
  }

  extend type Query {
    customerFindAll(search: String, page: Int, limit: Int): [CustomerResults]
    customerFindById(_id: ID): Customer
  }
  extend type Mutation {
    customerCreate(data: CustomerInput!): Customer!
    customerUpdate(data: CustomerInput!): Customer!
    customerDelete(_id: ID!): Customer!
  }
`;
