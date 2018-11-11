import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const REMOVE_CONTACT = gql`
    mutation removeContact($contactId: ID!){
        removeContact(contactId: $contactId)
    }
`;

export default ({ children }) => <Mutation mutation={REMOVE_CONTACT}>{children}</Mutation>;