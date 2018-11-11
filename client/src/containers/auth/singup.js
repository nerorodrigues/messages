import React from 'react';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

const SIGNUP = gql`
    mutation signup($userName: String!, $email: String!, $password: String!){
        signup(userName: $userName, email: $email, password: $password){
            email
        }
    }
`;

const SingUpContainer = ({ children }) => <Mutation mutation={SIGNUP}>{children}</Mutation>;
export default SingUpContainer;