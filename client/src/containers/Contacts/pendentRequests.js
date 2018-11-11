import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const PENDENT_REQUESTS = gql`
    query pendentRequests(){
        pendentRequests(){
            id,
            userId
        }
    }
`;

export default ({ children }) => <Query query={PENDENT_REQUESTS}>{children}</Query>;