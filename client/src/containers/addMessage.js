import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ADD_MESSAGE = gql`
    mutation addmessage($description: String!){
        addmessage(description: $description){
            id
            description
            user{
                username
            }
        }
    }
`


const AddMessageContainer = ({ children }) => <Mutation mutation={ADD_MESSAGE}>{children}</Mutation>

export default AddMessageContainer;