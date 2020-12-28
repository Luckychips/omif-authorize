import { AxiosResponse } from 'axios';
declare class AxiosClient {
    private axios;
    private token;
    constructor(baseUrl: string);
    updateAuthorizationToken(accessToken?: string): void;
    get<T>(path: string, payload?: any): Promise<AxiosResponse<any>>;
    post(path: string, payload: any): Promise<AxiosResponse<any>>;
    put(path: string, payload: any): Promise<AxiosResponse<any>>;
    delete(path: string, payload?: any): Promise<AxiosResponse<any>>;
}
declare const client: AxiosClient;
export default client;
