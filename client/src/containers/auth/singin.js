import React from 'react';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

const SIGNIN = gql`
    mutation signin($username: String!, $password: String!){
        signin(username: $username, password: $password)
    }
`;

export default ({ children }) => <Mutation mutation={SIGNIN}>{children}</Mutation>;


//export default {SignInContainer, SingUpContainer};
