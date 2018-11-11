function mapContact(contact) {
    return {
        id: contact._id,
        userId: contact.userId,
        requestedUserId: contact.requestedUserId
    };
};

module.exports = {
    friendList: (db, userId) => {
        return db.contact.find({
            $or: [{ userId: userId }, { requestedUserId: userId }],
            accepted: true
        });
    },
    pendentsRequests: (db, userId) => {
        return db.contact.find({
            userId: userId,
            accepted: false,
        });
    },
    pendentsInvites: (db, userId) => {
        return db.contact.find({
            requestedUserId: userId,
            accepted: false,
        });
    },
    addContact: (db, userId, requestedUserId, ) => {
        return db.contact.insert({
            userId: userId,
            requestedUserId: requestedUserId,
            accepted: false
        });
    },
    removeContact: (db, contactId) => {
        db.contact.remove({ _id: contactId });
    },
    acceptInvitation: (db, contactInvitationId) => {
        db.contact.update(
            { _id: contactInvitationId }, //Query Filter
            { $set: { accepted: true } } //Update Fields
        );
    },
    isRequested: async (db, id, requestedUserId) => {
        return await db.contact.findOne({
            userId: id,
            requestedUserId: requestedUserId,
            accepted: false
        }, pX => {
            if (pX)
                return true;
            return false
        })
    }
}