import React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

export const MESSAGE_ADDED = gql`
    subscription messageAdded{
        messageAdded{
            id
            description
        }
    }
`;

const MessageAddedContainer = ({ children }) => <Subscription subscription={MESSAGE_ADDED}>{
    ({ ...props }) => {
        if (!props.loading)
            return (<h4>New Message: {props.data.messageAdded.description}</h4>);
        return null;
    }}
</Subscription>

export default MessageAddedContainer;
