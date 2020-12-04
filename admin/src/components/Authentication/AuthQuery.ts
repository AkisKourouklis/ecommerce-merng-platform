import { gql } from "graphql-request";

export const AUTH_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const AUTH_CHECK = gql`
  mutation authCheck($token: String!) {
    checkToken(token: $token) {
      token
    }
  }
`;
