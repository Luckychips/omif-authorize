import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import fetch from 'cross-fetch';

const userHttpLink = new HttpLink({
  uri: 'https://api-gw-stage.onemedics.net/user/graphql',
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

const apolloClient = new ApolloClient({
  link: ApolloLink.from([userHttpAuthLink, userErrorLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
