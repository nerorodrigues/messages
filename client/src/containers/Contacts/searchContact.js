import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SEARCH_CONTACT = gql`
    query users($userName: String){
        users(userName: $userName){
            id
            userName
            email,
            requested
        }
    }
`;

export default ({ children }) => <Query query={SEARCH_CONTACT}>{children}</Query>;