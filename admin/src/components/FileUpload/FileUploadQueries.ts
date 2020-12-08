import { gql } from "graphql-request";

export const UPLOAD_IMAGE = gql`
  mutation($files: [Upload]) {
    uploadImage(files: $files) {
      path
      alt
      _id
    }
  }
`;
