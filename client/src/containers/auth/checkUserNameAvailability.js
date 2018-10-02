import React from 'react';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

const CHECK_USER_NAME_AVAILABILITY = gql`
    mutation checkUserNameAvailability($username: String!){
        checkUserNameAvailability(username: $username)
    }
`;

export default ({ children }) => <Mutation mutation={CHECK_USER_NAME_AVAILABILITY}>{children}</Mutation>;