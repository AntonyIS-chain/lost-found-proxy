import ParentClass from "./ParentClass";
import { AuthServiceInterface, LoginResponse, Response, User, ValidateTokenResponse } from "../types";
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

  async refreshToken(refreshToken: string): Promise<Response<LoginResponse>> {
    try {

      const response = await this.datasource.refreshToken(refreshToken);
      return response;
    } catch (error: any) {
      return {
        message: error.response?.data?.message || "Refresh token failed",
        statusCode: error.response?.status || 500,
        success: false,
      };
    }
  }

  async validateToken(access_token: string): Promise<Response<ValidateTokenResponse>> {
    try {

      const response = await this.datasource.validateToken(access_token);
      return response;
    } catch (error: any) {
      return {
        message: error.response?.data?.message || "Validate token access token failed",
        statusCode: error.response?.status || 500,
        success: false,
      };
    }
  }

  async logout(refreshToken: string): Promise<Response<LoginResponse>> {
    try {
      const response = await this.datasource.logout(refreshToken);
      return response;
    } catch (error: any) {
      return {
        message: error.response?.data?.message || "Refresh token failed",
        statusCode: error.response?.status || 500,
        success: false,
      };
    }
  }

}

export default AuthService;