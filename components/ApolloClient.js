import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import clientConfig from '../clientConfig';

/**
 * Create and initialize a new ApolloClient instance.
 * @see https://www.apollographql.com/docs/react/get-started/#creating-client
 * @see https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient
 */
const client = new ApolloClient({
  link: createHttpLink({
    uri: clientConfig.graphQlUrl,
  }),
  cache: new InMemoryCache(),
});

export default client;
