import { GetHeaders } from "../../utils/helpers";
import { Response } from "../../types";


class ParentClass {
    public sourceSystem: string;

    constructor(sourceSystem: string = "") {
        this.sourceSystem = sourceSystem;
    }
    
    protected async getRequestHeaders(token: string): Promise<Record<string, string>> {
        return await GetHeaders(token, this.sourceSystem);
    }
    

    protected handleErrorResponse(error: any): Response {
        const statusCode = error?.response?.status || 500;
        const message = error?.response?.data?.message || "An unexpected error occurred";

        return {
            success: false,
            statusCode,
            message,
        };
    }
}

export default ParentClass;
