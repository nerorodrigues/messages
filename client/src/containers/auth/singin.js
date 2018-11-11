import React from 'react';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

const SIGNIN = gql`
    mutation signin($userName: String!, $password: String!){
        signin(userName: $userName, password: $password)
    }
`;

export default ({ children }) => <Mutation mutation={SIGNIN}>{children}</Mutation>;


//export default {SignInContainer, SingUpContainer};
