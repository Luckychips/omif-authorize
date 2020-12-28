"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const OAUTH_BASIC_KEY = 'Basic ZG9zb28td2ViOnNlY3JldA==';
class AxiosClient {
    constructor(baseUrl) {
        this.token = OAUTH_BASIC_KEY;
        this.axios = axios_1.default.create({
            baseURL: baseUrl,
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.token,
            },
        });
    }
    updateAuthorizationToken(accessToken) {
        this.axios.defaults.headers.Authorization = accessToken
            ? {
                toString() {
                    return accessToken;
                },
            }
            : OAUTH_BASIC_KEY;
    }
    get(path, payload) {
        return this.axios.get(path, payload).then((response) => response);
    }
    post(path, payload) {
        const options = {
            headers: {
                'Content-Type': payload instanceof FormData ? 'multipart/form-data' : 'application/json',
            },
        };
        return this.axios.post(path, payload, options).then((response) => response);
    }
    put(path, payload) {
        return this.axios.put(path, payload).then((result) => result);
    }
    delete(path, payload) {
        return this.axios.delete(path, payload).then((result) => result);
    }
}
const client = new AxiosClient('https://api-gw-stage.onemedics.net');
exports.default = client;
