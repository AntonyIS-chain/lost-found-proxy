import ParentClass from "./ParentClass";
import { MatchingServiceInterface, Response, UserIdentityCard } from "../types";
import MatchingHTTPHandler from "../datasources/http/MatchingHTTPHandler";

class MatchingService extends ParentClass {
  private datasource: MatchingServiceInterface;

  constructor() {
    super();
    this.datasource = new MatchingHTTPHandler();
  }


  async getLostIds(): Promise<Response<UserIdentityCard>> {
    const response = await this.datasource.getLostIds()

    return response;
  }

  async getLostId(id: string): Promise<Response<UserIdentityCard>> {
    const response = await this.datasource.getLostId(id)

    return response;
  }


 
}

export default  MatchingService;
