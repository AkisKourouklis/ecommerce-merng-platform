import { gql } from 'apollo-server-express';

export default gql`
  type Image {
    id: ID
    alt: String
    url: String
    size: Int
  }

  type ImageResult {
    images: [Image]
    currentPage: Int
    totalPages: Int
  }

  input ImageInput {
    alt: String!
    url: String!
    size: Int!
  }
  extend type Query {
    findAllImages(search: String, page: Int, limit: Int): ImagesResult
  }
  extend type Mutation {
    uploadImage(file: Upload!): String!
    createImage(imageInput: ImageInput): Images!
    removeImage(_id: ID): Image!
  }
`;
