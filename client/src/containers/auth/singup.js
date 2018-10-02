import React from 'react';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

const SIGNUP = gql`
    mutation signup($username: String!, $email: String!, $password: String!){
        signup(username: $username, email: $email, password: $password){
            email
        }
    }
`;

const SingUpContainer = ({ children }) => <Mutation mutation={SIGNUP}>{children}</Mutation>;
export default SingUpContainer;