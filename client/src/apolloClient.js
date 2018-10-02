import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link';
//import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from "apollo-link-context";

const getToken = () => {
    return localStorage.getItem('token');
}

export const createClient = () => {

    const httpLink = createUploadLink({uri: 'http://localhost:3001/graphql'});
    //const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql', })

    const cache = new InMemoryCache();

    const subscriptionClient = new SubscriptionClient('ws://localhost:3001/subscription', {
        reconnect: true,
        connectionParams: {
            authToken: getToken()//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuZXJvLnJvZHJpZ3Vlc0BnbWFpbC5jb20iLCJpYXQiOjE1MzcxMjU5NzQsImV4cCI6MTUzNzIxMjM3NH0.PC-nAIdY0-lUyQ3jflC1LtEdI8CSzryZLwjyvW9xYBk'
        },
        lazy: true,
    });

    const authLink = setContext((_, { headers }) => {
        const token = getToken();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
    });

    const link = split(({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';

    }, subscriptionClient, httpLink);

    const client = new ApolloClient({
        link: authLink.concat(link),
        cache
    });

    return client;
}

const client = createClient();

export const withApolloClient = App => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

export default client;





