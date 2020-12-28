"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@apollo/client");
const context_1 = require("@apollo/client/link/context");
const error_1 = require("@apollo/client/link/error");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const userHttpLink = new client_1.HttpLink({
    uri: 'https://api-gw-stage.onemedics.net/user/graphql',
    fetch: cross_fetch_1.default,
});
const userAuthLink = context_1.setContext(async (_, { headers }) => {
    return {
        headers: {
            ...headers,
            Authorization: '',
        },
    };
});
const userHttpAuthLink = userAuthLink.concat(userHttpLink);
const userErrorLink = error_1.onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => console.warn(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
        if (networkError) {
            console.warn(`[Network error]: ${networkError}`);
        }
    }
});
const apolloClient = new client_1.ApolloClient({
    link: client_1.ApolloLink.from([userHttpAuthLink, userErrorLink]),
    cache: new client_1.InMemoryCache(),
});
exports.default = apolloClient;
