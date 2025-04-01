import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String
    phone: String
    role: Role!
    roleId: Int!
    isActive: Boolean!
  }

  enum Role {
    ADMIN
    USER
    MODERATOR
  }

  interface Response {
    success: Boolean!
    statusCode: Int!
    message: String
  }

  type UserResponse implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results: User
  }

  type UserListResponse implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results: [User]
  }

  type BooleanResponse implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results: Boolean
  }

  type StringResponse implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results: String
  }

  type LoginResponse {
    access_token: String!
    refresh_token: String!
  }

  type LoginResponseType implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results: LoginResponse
  }

  type Query {
    getUserByID(userID: ID!): UserResponse
    getUserByEmail(email: String!): UserResponse
    listUsers: UserListResponse
  }

  type Mutation {
    signup(
      first_name: String!
      last_name: String!
      email: String!
      phone: String!
      role_id: Int!
      role_name: String!
      password: String!
    ): UserResponse

    login(email: String!, password: String!): LoginResponseType
    updateUser(userID: ID!, updates: UserUpdateInput!): UserResponse
    deleteUser(adminID: ID!, userID: ID!): BooleanResponse
    deactivateUser(userID: ID!): BooleanResponse
    activateUser(userID: ID!): BooleanResponse
    refreshToken(refreshToken: String!): StringResponse
    assignRole(userID: ID!, roleID: Int!): BooleanResponse
    changePassword(userID: ID!, oldPassword: String!, newPassword: String!): BooleanResponse
    forgotPassword(email: String!): BooleanResponse
    resetPassword(token: String!, newPassword: String!): BooleanResponse
    verifyEmail(token: String!): BooleanResponse
  }

  input UserUpdateInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    role: Role
    roleId: Int
    isActive: Boolean
  }
`;

export default typeDefs;
