import ParentClass from "./ParentClass";
import { MatchingServiceInterface, Response, IDDocument } from "../types";
import MatchingHTTPHandler from "../datasources/http/MatchingHTTPHandler";

class MatchingService extends ParentClass {
  private datasource: MatchingServiceInterface;

  constructor() {
    super();
    this.datasource = new MatchingHTTPHandler();
  }


  async GetIDDocuments(idType:string): Promise<Response<IDDocument[]>> {
    return  await this.datasource.GetIDDocuments(idType)
  }

  async GetIDDocument(idType:string, id: string): Promise<Response<IDDocument>> {
    return await this.datasource.GetIDDocument(idType, id)
  }

  async ReportID(doc:IDDocument,idType: string): Promise<Response<IDDocument>> {
    return await this.datasource.ReportID(doc,idType)
  }

}

export default  MatchingService;
