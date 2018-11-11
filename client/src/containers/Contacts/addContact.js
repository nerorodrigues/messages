import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ADD_CONTACT = gql`
    mutation addContact($requestedUserId: ID!){
        addContact(requestedUserId: $requestedUserId)
    }
`

export default ({ children }) => <Mutation mutation={ADD_CONTACT}>{children}</Mutation>;