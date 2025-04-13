import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Upload

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
    user_id: String!
    role: String!
  }

  type LoginResponse {
    access_token: String!
    refresh_token: String!
    session_user: SessionUser!
  }

  type SessionResponse implements Response {
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
  type IDDocument {
    id: ID!
    id_number: String!
    full_name: String!
    location: String
    phone_number: String
    email: String
    date_reported: String!
    status: String!
    file_path: String
    created_at: String!
    updated_at: String!
  }

  type IDMatch {
    id: ID!
    lost_id_number: String!
    found_id_number: String!
    matched_by: String!
    matched_at: String!
    status: String!
    created_at: String!
    updated_at: String!
  }

  type IDDocumentResponse implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results: IDDocument
  }

  type IDDocumentsResponse implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results: [IDDocument]
  }

  type IDMatchResponse implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results: IDMatch
  }

  type IDMatchesResponse implements Response {
    success: Boolean!
    statusCode: Int!
    message: String
    results: [IDMatch]
  }

  input ReportIDInput {
    id_number: String!
    full_name: String!
    location: String
    phone_number: String
    email: String
    file_path: Upload
    status: String!
  }

  input MatchIDInput {
    lost_id_number: String!
    found_id_number: String!
    matched_by: String!
    status: String!
  }


  type Query {
    getUserByID(userID: ID!): UserResponse
    getUserByEmail(email: String!): UserResponse
    listUsers: UserListResponse

    # ID Document
    GetIDDocuments(IDType: String!): IDDocumentsResponse
    GetIDDocument(IDType: String!, id: String!): IDDocumentResponse

    # ID Match
    GetMatchByLostID(idNumber: String!): IDMatchResponse
    GetMatched: IDMatchesResponse
  }

  type Mutation {
    signup(
      email: String!
      role_id: Int!
      role_name: String!
      phone_number: String
      password: String!
    ): SessionResponse

    login(email: String!, password: String!): SessionResponse
    updateUser(userID: ID!, updates: UserUpdateInput!): UserResponse
    deleteUser(adminID: ID!, userID: ID!): BooleanResponse
    deactivateUser(userID: ID!): BooleanResponse
    activateUser(userID: ID!): BooleanResponse
    refreshToken(refresh_token: String!): SessionResponse
    validateToken(access_token: String!): RefreshTokenResponseType
    logout(refresh_token: String!): GeneralResponse
    assignRole(userID: ID!, roleID: Int!): BooleanResponse
    changePassword(userID: ID!, oldPassword: String!, newPassword: String!): BooleanResponse
    forgotPassword(email: String!): BooleanResponse
    resetPassword(token: String!, newPassword: String!): BooleanResponse
    verifyEmail(token: String!): BooleanResponse

    # ID Document
    ReportID(doc: ReportIDInput!,idType: String!): IDDocumentResponse
    DeleteIDDocument(id: String!, IDType: String!): BooleanResponse

    # Match
    SaveMatch(input: MatchIDInput!): BooleanResponse
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
