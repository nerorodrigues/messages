const { PubSub } = require('graphql-subscriptions');

const pubSub = new PubSub();

const messages = [
    {
        id: 1,
        description: "mensagem"
    },
    {
        id: 2,
        description: "mensagem"
    }
]

var messageID = 3;

module.exports = {
    resolver: {
        Query: {
            messages: () => {
                return messages;
            }
        },
        Mutation: {
            addmessage: async (root, args, context) => {
                let _id = messageID++;
                var message = {
                    id: _id,
                    description: args.description
                };

                messages.push(message);
                pubSub.publish('MESSAGE_ADDED', { messageAdded: message });
                return message;
            }
        },
        Subscription: {
            messageAdded: {
                subscribe: async (root, args, ctx) => await pubSub.asyncIterator(['MESSAGE_ADDED'])
            }
        }
    }
}