import ParentClass from "./ParentClass";
import axiosInstance from "../../utils/axiosInstance";
import { AxiosError } from "axios";
import { AuthServiceInterface, Response, User } from "../../types";

interface AuthTokens {
  access_token: string;
  refresh_token: string
}

class AuthHTTPHandler extends ParentClass implements AuthServiceInterface{
    constructor() {
        super();
        this.sourceSystem = "auth-portal";
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

    async login(email: string, password: string): Promise<Response<AuthTokens>> {
        return this.handleRequest(
            axiosInstance.post<AuthTokens>("/v1/api/auth/login", { email, password })
        );
    }

    async signup(user: User): Promise<Response<User>> {
      return this.handleRequest(
          axiosInstance.post<User>("/v1/api/auth/signup", {...user })
      );
    }
  
    async refreshToken(refreshToken: string): Promise<Response<AuthTokens>> {
        return this.handleRequest(
            axiosInstance.post<AuthTokens>("/auth/refresh-token", { refreshToken })
        );
    }

    async logout(refreshToken: string): Promise<Response<void>> {
        return this.handleRequest(
            axiosInstance.post<void>("/auth/logout", { refreshToken })
        );
    }

    protected handleErrorResponse(error: AxiosError): Response {
        console.error("Error in API Request:", error);

        const statusCode = error.response?.status || 500;
        const message = (error.response?.data as { message?: string })?.message || "An unexpected error occurred";

        return {
            success: false,
            statusCode,
            message,
        };
    }
}

export default AuthHTTPHandler;
