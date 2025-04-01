import ParentClass from "./ParentClass";
import { UserServiceInterface, User, Response } from "../types";
import UsersHTTPHandler from "../datasources/http/UsersHTTPHandler";

class UserService extends ParentClass {
  private datasource: UserServiceInterface;

  constructor() {
    super();
    this.datasource = new UsersHTTPHandler();
  }

  async registerUser(user: User): Promise<Response<User>> {
    return this.datasource.registerUser(user);
  }

  async authenticateUser(email: string, password: string): Promise<Response<User>> {
    return this.datasource.authenticateUser(email, password);
  }

  async getUserByID(userID: string): Promise<Response<User>> {
    const response = await this.datasource.getUserByID(userID);

    if (response.success && response.results) {
      response.results = this.transformUser(response.results);
    }

    return response;
  }

  async getUserByEmail(email: string): Promise<Response<User>> {
    return this.datasource.getUserByEmail(email);
  }

  async listUsers(): Promise<Response<User[]>> {
    const response = await this.datasource.listUsers();

    if (response.success && response.results) {
      response.results = response.results.map(this.transformUser);
    }

    return response;
  }

  async updateUser(userID: string, updates: Partial<User>): Promise<Response<User>> {
    return this.datasource.updateUser(userID, updates);
  }

  async deleteUser(adminID: string, userID: string): Promise<Response<void>> {
    return this.datasource.deleteUser(adminID, userID);
  }

  async deactivateUser(userID: string): Promise<Response<void>> {
    return this.datasource.deactivateUser(userID);
  }

  async activateUser(userID: string): Promise<Response<void>> {
    return this.datasource.activateUser(userID);
  }

  async refreshToken(refreshToken: string): Promise<Response<string>> {
    return this.datasource.refreshToken(refreshToken);
  }

  async assignRole(userID: string, roleID: string): Promise<Response<void>> {
    return this.datasource.assignRole(userID, roleID);
  }

  async changePassword(userID: string, oldPassword: string, newPassword: string): Promise<Response<void>> {
    return this.datasource.changePassword(userID, oldPassword, newPassword);
  }

  async forgotPassword(email: string): Promise<Response<void>> {
    return this.datasource.forgotPassword(email);
  }

  async resetPassword(token: string, newPassword: string): Promise<Response<void>> {
    return this.datasource.resetPassword(token, newPassword);
  }

  async verifyEmail(token: string): Promise<Response<void>> {
    return this.datasource.verifyEmail(token);
  }

  /** 🔹 Utility Function to Transform User Data */
  private transformUser(user: User): User {
    return {
      ...user
    };
  }
}

export default  UserService;
