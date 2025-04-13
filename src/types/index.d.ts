export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role_name?: "Administrator" | "Moderator" | "Guest";
  phone_number?: "Administrator" | "Moderator" | "Guest";
  password?:string;
  role_id?: 1 | 2 | 3 | 4;
  isActive?: boolean;
}

interface SessionUser {
  id: string;
  role: string;
}

export interface SessionResponse {
  access_token: string;
  refresh_token: string;
  token_type:string;
  expires_in: number;
  session_user: SessionUser
}



export interface ValidateTokenResponse {
  claims: boolean;
  valid: boolean;
}


export interface Response<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  results?: T;
}

export interface UserServiceInterface {
  registerUser(user: User): Promise<Response<User>>;
  authenticateUser(email: string, password: string): Promise<Response<User>>;
  getUserByID(userID: string): Promise<Response<User>>;
  getUserByEmail(email: string): Promise<Response<User>>;
  listUsers(): Promise<Response<User[]>>;
  updateUser(userID: string, updates: Partial<User>): Promise<Response<User>>;
  deleteUser(adminID: string, userID: string): Promise<Response<void>>;
  deactivateUser(userID: string): Promise<Response<void>>;
  activateUser(userID: string): Promise<Response<void>>;
  refreshToken(refreshToken: string): Promise<Response<string>>;
  assignRole(userID: string, roleID: string): Promise<Response<void>>;
  changePassword(userID: string, oldPassword: string, newPassword: string): Promise<Response<void>>;
  forgotPassword(email: string): Promise<Response<void>>;
  resetPassword(token: string, newPassword: string): Promise<Response<void>>;
  verifyEmail(token: string): Promise<Response<void>>;
}

export interface IDDocument {
  id?: string;
  id_number: string;
  full_name?: string;
  location?: string;
  phone_number?: string;
  email?: string;
  date_reported: string; 
  status: string;
  file_path: string;
  created_at: string; 
  updated_at: string; 
}



export interface AuthServiceInterface {
  login(email: string, password:string): Promise<Response<SessionResponse>>;
  signup(user: User): Promise<Response<SessionResponse>>;
  refreshToken(refresh_token: string): Promise<Response<SessionResponse>>;
  validateToken(access_token: string): Promise<Response<ValidateTokenResponse>>;
  logout(refresh_token: string): Promise<Response>;
}

export interface MatchingServiceInterface {
  GetIDDocument(id: string, IDType: string): Promise<Response<IDDocument>>;
  GetIDDocuments(IDType: string): Promise<Response<IDDocument[]>>;
  ReportID(doc: IDDocument,idType: string): Promise<Response<IDDocument>>;
}


export interface DataSources {
  UserService: UserServiceInterface;
  AuthService: AuthServiceInterface;
  MatchingService: MatchingServiceInterface;
}
