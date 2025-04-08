import ParentClass from "./ParentClass";
import axiosInstance from "../../utils/axiosInstance";
import { AxiosError } from "axios";
import { AuthServiceInterface, Response, User, ValidateTokenResponse } from "../../types";

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
  
    async refreshToken(refresh_token: string): Promise<Response<AuthTokens>> {
        return this.handleRequest(
            axiosInstance.post<AuthTokens>("/v1/api/auth/refresh-token", { refresh_token })
        );
    }

    async validateToken(access_token: string): Promise<Response<ValidateTokenResponse>> {
        return this.handleRequest(
            axiosInstance.post<ValidateTokenResponse>("/v1/api/auth/validate-token", { access_token })
        );
    }


    async logout(refresh_token: string): Promise<Response> {
        console.log("TOKN",refresh_token )
        return this.handleRequest(
            axiosInstance.post<Response>("/v1/api/auth/logout", { refresh_token })
        );
    }

    protected handleErrorResponse(error: AxiosError): Response {
        // console.error("Error in API Request:", error);

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
