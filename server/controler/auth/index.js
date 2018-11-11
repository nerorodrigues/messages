const bcryptjs = require('bcryptjs')

module.exports = {
    saveUser: async (db, data) => {
        const user = {
            userName: data.userName,
            email: data.email,
            password: await bcryptjs.hash(data.password, 10),
            creationDate: new Date(),
            status: 1
        }

        await db.user.insert(user);
        return user
    },

    findUser: (db, email) => {
        return db.user.findOne({ $or: [{ email: email }, { userName: email }] });
    },
    findUserById: async(db, id) => {
        var user = await db.user.find({});
        return await db.user.findOne({ _id: id });
    },
    deleteUser: (db) => {

    },
    checkAvailability: async (db, data) => {
        return await db.user.count(data) == 0;
    },
}