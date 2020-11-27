import { gql } from 'apollo-server-express';

export default gql`
  type UsersResult {
    users: [User]
    currentPage: Int
    totalPages: Int
  }

  type User {
    _id: ID
    fullname: String
    email: String
    password: String
    role: String
    lastActive: String
  }

  type Token {
    token: String
  }

  input UserInput {
    fullname: String
    email: String
    password: String
    role: String
    lastActive: String
  }

  extend type Query {
    findAllUsers(search: String, page: Int, limit: Int): UsersResult!
    findUserByEmail(email: String!): User!
  }
  extend type Mutation {
    register(userInput: UserInput!): User!
    updateUser(userInput: UserInput!, _id: ID): User!
    deleteUser(_id: ID): User!
    login(email: String, password: String): Token!
  }
`;
