import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const PENDENT_INVITES = gql`
    query pendentInvites(){
        pendentInvites(){
            id,
            userId
        }
    }
`;

export default ({ children }) => <Query query={PENDENT_INVITES}>{children}</Query>;