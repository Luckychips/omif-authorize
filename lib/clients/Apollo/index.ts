import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import fetch from 'cross-fetch';

export default class WrappedApolloClient {
  private readonly instance: ApolloClient<NormalizedCacheObject>;

  constructor(uri: string) {
    const userHttpLink = new HttpLink({
      uri: uri,
      fetch: fetch,
    });

    const userAuthLink = setContext(async (_, { headers }) => {
      return {
        headers: {
          ...headers,
          Authorization: '',
          // ClientId: 'dosoo-app',
          // AppVersion: '1.5.00',
        },
      };
    });

    const userHttpAuthLink = userAuthLink.concat(userHttpLink);
    const userErrorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.warn(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );

        if (networkError) {
          console.warn(`[Network error]: ${networkError}`);
        }
      }
    });

    this.instance = new ApolloClient({
      link: ApolloLink.from([userHttpAuthLink, userErrorLink]),
      cache: new InMemoryCache(),
    });

    return this;
  }

  getInstance() {
    return this.instance;
  }
}
