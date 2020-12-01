import { gql } from 'apollo-server-express';

export default gql`
  type TagsResult {
    tags: [Tags]
    currentPage: Int
    totalPages: Int
  }

  type Tags {
    _id: ID
    name: String
  }
  input TagInfo {
    _id: ID!
    name: String!
  }

  extend type Query {
    findAllTags(search: String, page: Int, limit: Int): TagsResult
  }

  extend type Mutation {
    createTag(tagInfo: TagInfo): Tags!
    removeTagFromProduct(tagInfo: TagInfo, ProductInput: ProductInput): Product!
    addTagToProduct(tagInfo: TagInfo, ProductInput: ProductInput): Product!
    editTagFromProduct(tagInfo: TagInfo): Tags!
  }
`;
