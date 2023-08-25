import { ProductLookup, ProductLookupExtended, ResponseStatus } from '../types';
import { SERVER_URL } from '../constants';
import CommonApi from './CommonApi';

export class ProductLookupApi {
  private readonly productLookupUrlPath: string;

  constructor(urlPath: string) {
    this.productLookupUrlPath = urlPath;
  }

  async productLookupAll(): Promise<ProductLookup[]> {
    const response = await fetch(`${SERVER_URL}/${this.productLookupUrlPath}/all`);
    return await response.json();
  }
  async productLookupAllExtended(): Promise<ProductLookupExtended[]> {
    const response = await fetch(`${SERVER_URL}/${this.productLookupUrlPath}/all/extended`);
    return await response.json();
  }
  async productLookupCreate(body: string): Promise<ResponseStatus> {
    return await CommonApi.entityCreate(body, this.productLookupUrlPath);
  }
  async productLookupUpdate(id: string, body: string): Promise<ResponseStatus> {
    return await CommonApi.entityUpdate(id, body, this.productLookupUrlPath);
  }
  async productLookupDelete(id: string): Promise<ResponseStatus> {
    return await CommonApi.entityDelete(id, this.productLookupUrlPath);
  }
}