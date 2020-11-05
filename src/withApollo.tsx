import React from 'react';
import withApolllo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

export const withApollo = withApolllo(
  ({ initialState }) =>
    new ApolloClient({
      uri: process.env.NEXT_PUBLIC_API_URL,
      cache: new InMemoryCache().restore(initialState || {}),
    }),
  {
    // eslint-disable-next-line react/display-name
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
