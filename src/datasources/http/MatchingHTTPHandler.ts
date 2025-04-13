import { Response, MatchingServiceInterface, IDDocument } from "../../types";
import ParentClass from "./ParentClass";
import axiosInstance from "../../utils/axiosInstance";
import { AxiosError } from "axios";

class MatchingHTTPHandler extends ParentClass implements MatchingServiceInterface {
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

    async GetIDDocuments(idType:string): Promise<Response<IDDocument[]>> {
        return this.handleRequest(axiosInstance.get<IDDocument[]>(`/v1/matching/${idType}`));
    }

    async GetIDDocument(idType:string,id: string): Promise<Response<IDDocument>> {
        return this.handleRequest(axiosInstance.get<IDDocument>(`/v1/matching/${idType}/${id}`));
    }

    async ReportID(doc:IDDocument,idType: string): Promise<Response<IDDocument>> {
        return this.handleRequest(axiosInstance.post<IDDocument>(`/v1/matching/report/${idType}`, {... doc}));
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

export default MatchingHTTPHandler;
