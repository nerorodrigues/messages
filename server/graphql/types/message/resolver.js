const { PubSub } = require('graphql-subscriptions');
const messagesControler = require('../../../controler/messages');
const userController = require('../../../controler/auth');
const pubSub = new PubSub();

module.exports = {
    resolver: {
        User: { id: ({ _id }) => _id, username: ({ userName }) => userName },
        Message: {
            id: ({ _id }) => _id,
            user: async (owner, args, { db }) => {
                var user = await userController.findUserById(db, owner.user);
                return user;
            }
        },
        Query: {
            messages: async (root, args, { db, user }) => {
                var messages = messagesControler.getMessages(db);
                return messages;
            }
        },
        Mutation: {
            addmessage: async (root, args, { db, user }) => {
                var message = {
                    description: args.description,
                    user: user.id,
                    creationDate: new Date()
                };

                messageAdded = messagesControler.addMessage(db, message);
                pubSub.publish('MESSAGE_ADDED', { messageAdded });
                return messageAdded;
            }
        },
        Subscription: {
            messageAdded: {
                subscribe: async (root, args, ctx) => await pubSub.asyncIterator(['MESSAGE_ADDED'])
            }
        }
    }
}