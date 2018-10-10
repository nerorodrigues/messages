module.exports = {
    addMessage: async (db, message) => {

        var message = await db.message.insert(message);
        return message;
    },
    getMessages: async (db) => {
        var messages = await db.message.find({});
        return messages;
    }
}