import { gql } from 'apollo-server-express';

export default gql`
  type Category {
    _id: ID
    name: String
    description: String
    images: [CategoryImages]
    products: [Product]
    tags: [String]
    seo: CategorySeo
  }

  type CategorySeo {
    name: String
    description: String
  }

  type CategoryResults {
    categories: [Category]
    currentPage: Int
    totalPages: Int
  }

  type CategoryImages {
    path: String
    alt: String
  }

  input CategoryInput {
    _id: ID
    name: String
    description: String
    images: [ImageInput]
    products: [ProductInput]
    tags: [CategotyTagInput]
    seo: CategorySeoInput
  }

  input CategotyTagInput {
    _id: ID!
  }

  input CategorySeoInput {
    name: String
    description: String
  }

  extend type Query {
    categoryFindAll(search: String, page: Int, limit: Int): CategoryResults
    categoryFindById(_id: ID!): Category
  }
  extend type Mutation {
    categoryCreate(categoryInput: CategoryInput!): Category!
    categoryEdit(categoryInput: CategoryInput!): Category!
    categoryDelete(_id: String!): Category!
    categoryAddProducts(products: [ProductInput]!, categoryId: ID!): String!
    categoryRemoveProducts(products: [ProductInput]!, categoryId: ID!): String!
  }
`;
