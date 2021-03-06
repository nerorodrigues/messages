import React, { Component } from 'react';
import MessagesContainer from "../containers/messages";
import AddMessageContainer from '../containers/addMessage';
import MessageAddedContainer, { MESSAGE_ADDED } from "../containers/messageAdded";

const addMessageInner = (mutation, { ...props }) => {
    if (props.loading) return <div>Loading...</div>;
    if (props.error) return <div>Error :(</div>;
    var message = '';
    const onClickHandler = (evt) => {
        message = evt.target.value;
    }

    const onKeyPressHandler = (evt) => {
        if (evt.keyCode === 13 || evt.which === 13) {
            mutation({ variables: { description: message } });
            evt.target.value = '';
            message = evt.target.value;
        }
    }

    return (
        <div>
            <input autoFocus type="texto" onChange={onClickHandler} onKeyPress={onKeyPressHandler}></input>
        </div >
    );
}

class MessageList extends Component {

    subscribeToNewMessages() {
        this.props.subscribeToMore({
            document: MESSAGE_ADDED,
            updateQuery: (prev, { ...props }) => {
                if (!props.subscriptionData.data)
                    return prev;
                const newMessage = props.subscriptionData.data.messageAdded;
                if (!prev.messages.find((msg) => msg.id === newMessage.id)) {
                    return Object.assign({}, prev, {
                        messages: [...prev.messages, newMessage]
                    });
                } else
                    return prev;
            }
        });
    }
    componentDidMount() {
        this.subscribeToNewMessages();
    }

    render() {
        if (this.props.loading) return <div>Loading...</div>;
        if (this.props.error) return <div>Error... :(</div>;
        return (
            <div>
                <div className="ui relaxed divided list">
                    {this.props.data.messages.map(pX => {
                        return (
                            <div className="item" key={pX.id}>
                                <div className="content" >
                                    <a className="header">{pX.user.userName} disse: </a>
                                    <div className="description">{pX.description}</div>
                                </div>
                            </div>);
                    })}
                </div>
                <div>
                    <AddMessageContainer>{addMessageInner}</AddMessageContainer>
                </div>
            </div>
        );
    }
}


const MessagesList = () => <MessagesContainer>{({ ...props }) => <MessageList {...props} />}</MessagesContainer>;

export default MessagesList;