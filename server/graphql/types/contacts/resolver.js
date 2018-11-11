const contactsController = require('../../../controler/contacts')

module.exports = {
    resolver: {
        Contact: { id: ({ _id }) => _id },
        Query: {
            contactList: (root, args, { db, user }) => {
                return contactsController.friendList(db, user.id);
            },
            pendentInvites: async (root, args, { db, user }) => {
                var invites = await contactsController.pendentsInvites(db, user.id);
                return invites;
            },
            pendentRequests: (root, args, { db, user }) => {
                return contactsController.pendentsRequests(db, user.id);
            }
        },
        Mutation: {
            addContact: async (root, args, { db, user }) => {
                await contactsController.addContact(db, user.id, args.requestedUserId);
            },
            removeContact: async (root, args, { db, user }) => {
                await contactsController.removeContact(db, args.contactId);
            },
            acceptInvitation: async (root, args, { db, user }) => {
                await contactsController.acceptInvitation(db, user.contactInvitationId);
            }
        }
    }
}