import React from 'react';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

const CHECK_USER_NAME_AVAILABILITY = gql`
    mutation checkUserNameAvailability($userName: String!){
        checkUserNameAvailability(userName: $userName)
    }
`;

export default ({ children }) => <Mutation mutation={CHECK_USER_NAME_AVAILABILITY}>{children}</Mutation>;