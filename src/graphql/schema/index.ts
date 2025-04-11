import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    role_name:Role
    role_id: Int
    isActive: Boolean!
  }

  enum Role {
    AdministratorlastName
    Guest
    Moderator
  }


  interface Response {
    success: Boolean!
    statusCode: Int!
    message: String
  }

  type GeneralResponse {
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

  type SessionUser {
    id: String!
    role: String!
  }

  type LoginResponse {
    access_token: String!
    refresh_token: String!
    session_user: SessionUser!
  }

  type LoginResponseType implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results: LoginResponse
  }

  type RefreshTokenResponseType implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    claims: Boolean!
    valid: Boolean!
  }

  type UserIdentityCard {
    id: ID!
    id_number: String!
    full_name: String!
    location_found: String!
    date_reported: String!
    status: String!
    created_at: String!
    updated_at: String!
  }

  type UserIdentityCardsResponse implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results : [UserIdentityCard]
  }

  type UserIdentityCardResponse implements Response {
    success: Boolean!
    statusCode: Int!
    message: String!
    results : UserIdentityCard
  }



  



  type Query {
    getUserByID(userID: ID!): UserResponse
    getUserByEmail(email: String!): UserResponse
    listUsers: UserListResponse
    getLostIds: UserIdentityCardsResponse
    getLostId(id: String!): UserIdentityCardResponse
  }

  type Mutation {
    signup(
      email: String!
      role_id: Int!
      role_name: String!
      password: String!
    ): UserResponse

    login(email: String!, password: String!): LoginResponseType
    updateUser(userID: ID!, updates: UserUpdateInput!): UserResponse
    deleteUser(adminID: ID!, userID: ID!): BooleanResponse
    deactivateUser(userID: ID!): BooleanResponse
    activateUser(userID: ID!): BooleanResponse
    refreshToken(refresh_token: String!): LoginResponseType
    validateToken(access_token: String!): RefreshTokenResponseType
    logout(refresh_token: String!): GeneralResponse
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
