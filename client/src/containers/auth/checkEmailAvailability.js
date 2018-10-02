import React from 'react';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

const CHECK_EMAIL_AVAILABILITY = gql`
    mutation checkEmailAvailability($email: String!){
        checkEmailAvailability(email: $email)
    }
`;

export default ({ children }) => <Mutation mutation={CHECK_EMAIL_AVAILABILITY}>{children}</Mutation>;