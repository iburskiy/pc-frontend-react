import { ResponseStatus } from '../types';
import { SERVER_URL } from '../constants';

class CommonApi {
  async entityAll (entityUrlPath: string) {
    const response = await fetch(`${SERVER_URL}/${entityUrlPath}/all`);
    return await response.json();
  }
  async entityRetrieve(id: string, entityUrlPath: string) {
    const response = await fetch(`${SERVER_URL}/${entityUrlPath}/retrieve/${id}`);
    const responseArr = await response.json();
    return responseArr;
  }

  async entityCreate(body: string, entityUrlPath: string): Promise<ResponseStatus> {
    const response = await fetch(`${SERVER_URL}/${entityUrlPath}/create`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: body,
    });
    const responseStatus = await this.generateResponseMessage(response);
    return responseStatus;
  }

  async entityUpdate(id: string, body: string, entityUrlPath: string): Promise<ResponseStatus> {
    const response = await fetch(`${SERVER_URL}/${entityUrlPath}/update/${id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: body,
    });
    const responseStatus = await this.generateResponseMessage(response);
    return responseStatus;
  }

  async entityDelete(id: string, entityUrlPath: string): Promise<ResponseStatus> {
    const response = await fetch(`${SERVER_URL}/${entityUrlPath}/delete/${id}`, {
      method: 'DELETE',
    });
    const responseStatus = await this.generateResponseMessage(response);
    return responseStatus;
  }

  private async generateResponseMessage(response: Response): Promise<ResponseStatus> {
    if (response.ok) {
      const data = await response.json();
      return {
        success: data.success,
        message: data.message,
      };
    }
    return {
      success: false,
      message: response.statusText,
    };
  }
}

export default new CommonApi(); // single instance pattern - bacically singleton