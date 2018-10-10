import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const MESSAGES = gql`
    query messsages {
        messages {
            id
            description
            user{
                username
            }
        }
    }
`;

const MessagesContainer = ({ children }) => <Query query={MESSAGES}>{children}</Query>;

export default MessagesContainer;