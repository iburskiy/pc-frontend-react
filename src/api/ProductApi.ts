import {
  Product,
  ResponseStatus,
  ProductDAO,
  ResponseStatusDelete,
} from '../types';
import CommonApi from './CommonApi';
import { PRODUCTS_PER_PAGE, SERVER_URL } from '../constants';

const ENTITY_URL_PATH = 'product';

class ProductApi {
  async productAll(urlParamPath: string): Promise<Product[]> {
    const response = await fetch(`${SERVER_URL}/${ENTITY_URL_PATH}/all/${PRODUCTS_PER_PAGE}${urlParamPath}`);
    const responseJson = await response.json();
    return responseJson;
  }
  async productCount(path: string): Promise<{productCount: number}> {
    const response = await fetch(`${SERVER_URL}/${ENTITY_URL_PATH}/count${path}`);
    const responseArr = await response.json();
    return responseArr;
  }
  async productRetrieve(id: string): Promise<ProductDAO> {
    return await CommonApi.entityRetrieve(id, ENTITY_URL_PATH) as Promise<ProductDAO>;
  }
  async productRetrieveByCode(code: string): Promise<Product> {
    const response = await fetch(`${SERVER_URL}/${ENTITY_URL_PATH}/retrieve/code/${code}`);
    return await response.json();
  }
  async productCreate(body: string): Promise<ResponseStatus> {
    return await CommonApi.entityCreate(body, ENTITY_URL_PATH);
  }
  async productUpdate(id: string, body: string): Promise<ResponseStatus> {
    return await CommonApi.entityUpdate(id, body, ENTITY_URL_PATH);
  }
  async productDelete(id: string): Promise<ResponseStatusDelete> {
    const response = await fetch(`${SERVER_URL}/${ENTITY_URL_PATH}/delete/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }
}
export default new ProductApi();