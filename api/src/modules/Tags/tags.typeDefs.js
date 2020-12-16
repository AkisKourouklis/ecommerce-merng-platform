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

  input TaggedProduct {
    _id: ID
    box: Int
    name: String
    selected: Boolean
    sku: String
  }

  input TagInfo {
    _id: ID!
    name: String!
  }

  extend type Query {
    findAllTags(search: String, page: Int, limit: Int): TagsResult
  }

  extend type Mutation {
    createTag(name: String): Tags!
    removeTagFromProduct(tagInfo: TagInfo, ProductInput: ProductInput): Product!
    addTagToProduct(tagsIds: [ID]!, productId: ID!): Product!
    addTagToMultipleProducts(tagId: ID, products: [TaggedProduct]): [Product]
    editTag(_id: ID, name: String): Tags!
  }
`;
