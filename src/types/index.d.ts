export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  roleName?: "admin" | "user" | "moderator";
  password?:string;
  roleId?: number;
  isActive?: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
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


export interface AuthServiceInterface {
  login(email: string, password:string): Promise<Response<LoginResponse>>;
  signup(user: User): Promise<Response<User>>;
}

export interface DataSources {
  UserService: UserServiceInterface;
  AuthService: AuthServiceInterface;
}
