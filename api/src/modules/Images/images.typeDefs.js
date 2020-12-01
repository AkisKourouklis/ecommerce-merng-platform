import { gql } from 'apollo-server-express';

export default gql`
  type ImageResult {
    images: [Image]
    currentPage: Int
    totalPages: Int
  }
  type Image {
    _id: ID
    alt: String
    url: String
    size: Int
  }

  input ImageInput {
    alt: String!
    url: String!
    size: Int!
  }
  extend type Query {
    findAllImages(search: String, page: Int, limit: Int): ImageResult
  }
  extend type Mutation {
    uploadImage(file: Upload!): String!
    createImage(imageInput: ImageInput): Image!
    removeImage(_id: ID): Image!
  }
`;
