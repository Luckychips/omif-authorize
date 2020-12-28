import axios, { AxiosInstance, AxiosResponse } from 'axios';

const OAUTH_BASIC_KEY = 'Basic ZG9zb28td2ViOnNlY3JldA==';
class AxiosClient {
  private axios: AxiosInstance;
  private token: string | object = OAUTH_BASIC_KEY;

  constructor(baseUrl: string) {
    this.axios = axios.create({
      baseURL: baseUrl,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token,
        // ClientId: 'dosoo-app',
        // AppVersion: '1.5.00',
      },
    });
  }

  updateAuthorizationToken(accessToken?: string) {
    this.axios.defaults.headers.Authorization = accessToken
      ? {
        toString() {
          return accessToken;
        },
      }
      : OAUTH_BASIC_KEY;
  }

  get<T>(path: string, payload?: any) {
    return this.axios.get<T>(path, payload).then((response: AxiosResponse) => response);
  }

  post(path: string, payload: any) {
    const options = {
      headers: {
        'Content-Type': payload instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    };

    return this.axios.post(path, payload, options).then((response: AxiosResponse) => response);
  }

  put(path: string, payload: any) {
    return this.axios.put(path, payload).then((result: AxiosResponse) => result);
  }

  delete(path: string, payload?: any) {
    return this.axios.delete(path, payload).then((result: AxiosResponse) => result);
  }
}

const client = new AxiosClient('https://api-gw-stage.onemedics.net');

export default client;

