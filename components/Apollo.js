import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import clientConfig from '../client-config';

/**
 * Create Apollo Client instance for GraphQL queries
 * @type {ApolloClient<unknown>}
 * @see https://www.apollographql.com/docs/react/get-started/
 */
const client = new ApolloClient({
    link: createHttpLink({
        uri: clientConfig.graphQlUrl,
        fetch: fetch,
    }),
    cache: new InMemoryCache()
})

export default client;
