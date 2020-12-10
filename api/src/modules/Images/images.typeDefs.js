import { gql } from 'apollo-server-express';

export default gql`
  type ImageResult {
    images: [Image]
    currentPage: Int
    totalPages: Int
  }

  type ImageUploadResult {
    _id: ID
    path: String
    alt: String
  }

  type Image {
    _id: ID
    alt: String
    path: String
    size: Int
  }

  input ImageInput {
    _id: ID
    alt: String
    path: String
    size: Int
  }
  extend type Query {
    findAllImages(search: String, page: Int, limit: Int): ImageResult
  }
  extend type Mutation {
    uploadImage(files: [Upload]): [ImageUploadResult]
    createImage(imageInput: ImageInput): Image!
    removeImage(_id: ID): Image!
  }
`;
