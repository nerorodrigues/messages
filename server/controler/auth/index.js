const bcryptjs = require('bcryptjs')

module.exports = {
    saveUser: async (db, data) => {
        const user = {
            userName: data.username,
            email: data.email,
            password: await bcryptjs.hash(data.password, 10),
            creationDate: new Date(),
            status: 1
        }

        await db.user.insert(user);
        return user
    },

    findUser: (db, email) => {
        return db.user.findOne({ $or: [{ email: email }, { username: email }] });
    },
    deleteUser: (db) => {

    },
    checkAvailability: async (db, data) => {
        return await db.user.count(data) == 0;
    },
}