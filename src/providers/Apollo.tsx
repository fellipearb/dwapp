import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const Apollo = ({ children }: any) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Apollo;
