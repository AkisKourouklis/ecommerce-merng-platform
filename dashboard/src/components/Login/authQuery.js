import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
