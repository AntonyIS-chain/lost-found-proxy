import { User, UserServiceInterface, Response } from "../../types";
import ParentClass from "./ParentClass";
import axiosInstance from "../../utils/axiosInstance";
import { AxiosError } from "axios";

class UsersHTTPHandler extends ParentClass implements UserServiceInterface {
    constructor() {
        super();
        this.sourceSystem = "users-portal"
    }

    private async handleRequest<T>(request: Promise<{ data: T }>): Promise<Response<T>> {
        try {
            const response = await request;
            return {
                success: true,
                statusCode: 200,
                message: "Success",
                results: response.data,
            };
        } catch (error: any) {
            return this.handleErrorResponse(error);
        }
    }

    async registerUser(user: User): Promise<Response<User>> {
        return this.handleRequest(axiosInstance.post<User>("/users", user));
    }

    async authenticateUser(email: string, password: string): Promise<Response<User>> {
        return this.handleRequest(axiosInstance.post<User>("/users/login", { email, password }));
    }

    async getUserByID(userID: string): Promise<Response<User>> {
        return this.handleRequest(axiosInstance.get<User>(`/users/${userID}`));
    }

    async getUserByEmail(email: string): Promise<Response<User>> {
        return this.handleRequest(axiosInstance.get<User>(`/users/email/${email}`));
    }

    async listUsers(): Promise<Response<User[]>> {
        return this.handleRequest(axiosInstance.get<User[]>("/users"));
    }

    async updateUser(userID: string, updates: Partial<User>): Promise<Response<User>> {
        return this.handleRequest(axiosInstance.put<User>(`/users/${userID}`, updates));
    }

    async deleteUser(adminID: string, userID: string): Promise<Response<void>> {
        return this.handleRequest(axiosInstance.delete<void>(`/users/${adminID}/${userID}`));
    }

    async deactivateUser(userID: string): Promise<Response<void>> {
        return this.handleRequest(axiosInstance.post<void>("/users/deactivate", { userID }));
    }

    async activateUser(userID: string): Promise<Response<void>> {
        return this.handleRequest(axiosInstance.post<void>("/users/activate", { userID }));
    }

    async refreshToken(refreshToken: string): Promise<Response<string>> {
        return this.handleRequest(axiosInstance.post<string>("/users/refresh-token", { refreshToken }));
    }

    async assignRole(userID: string, roleID: string): Promise<Response<void>> {
        return this.handleRequest(axiosInstance.post<void>("/users/assign-role", { userID, roleID }));
    }

    async changePassword(userID: string, oldPassword: string, newPassword: string): Promise<Response<void>> {
        return this.handleRequest(axiosInstance.post<void>("/users/change-password", { userID, oldPassword, newPassword }));
    }

    async forgotPassword(email: string): Promise<Response<void>> {
        return this.handleRequest(axiosInstance.post<void>("/users/forgot-password", { email }));
    }

    async resetPassword(token: string, newPassword: string): Promise<Response<void>> {
        return this.handleRequest(axiosInstance.post<void>("/users/reset-password", { token, newPassword }));
    }

    async verifyEmail(token: string): Promise<Response<void>> {
        return this.handleRequest(axiosInstance.post<void>("/users/verify-email", { token }));
    }

    protected handleErrorResponse(error: AxiosError): Response {
      console.error("Error in API Request:", error);
  
      const statusCode = error.response?.status || 500;
      
      // Ensure `error.response?.data` is treated as an object with a message property
      const message =
          (error.response?.data as { message?: string })?.message || "An unexpected error occurred";
  
      return {
          success: false,
          statusCode,
          message,
      };
  }
  
}

export default UsersHTTPHandler;
