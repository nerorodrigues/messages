import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ACCEPT_INVITATION = gql`
    mutation acceptInvitation($contactInvitationID: ID!){
        acceptInvitation(contactInvitationID: $contactInvitationID)
    }`;

export default ({ children }) => <Mutation mutation={ACCEPT_INVITATION}>{children}</Mutation>;