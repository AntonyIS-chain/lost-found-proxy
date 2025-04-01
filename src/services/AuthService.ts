import ParentClass from "./ParentClass";
import { AuthServiceInterface, LoginResponse, Response, User } from "../types";
import AuthHTTPHandler from "../datasources/http/AuthHTTPHandler";

class AuthService extends ParentClass {
  private datasource: AuthServiceInterface;

  constructor() {
    super();
    this.datasource = new AuthHTTPHandler();
  }

  async login(email: string, password: string): Promise<Response<LoginResponse>> {
    try {
      const response = await this.datasource.login(email, password);
      return response;
    } catch (error: any) {
      return {
        message: error.response?.data?.message || "Login failed",
        statusCode: error.response?.status || 500,
        success: false,
      };
    }
  }

  async signup(user: User): Promise<Response<User>> {
    try {
      const response = await this.datasource.signup(user);
      return response;
    } catch (error: any) {
      return {
        message: error.response?.data?.message || "Signup failed",
        statusCode: error.response?.status || 500,
        success: false,
      };
    }
  }
}

export default AuthService;