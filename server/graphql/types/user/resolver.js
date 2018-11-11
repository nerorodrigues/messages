const controller = require('../../../controler/contacts')
module.exports = {
    resolver: {
        User: {
            id: ({ _id }) => _id,
            requested: async ({ _id }, args, context) => {
                var value = await controller.isRequested(context.db, _id, context.user.id)
                if (value)
                    return true;
                return false;
            }
        },
        Query: {
            me: async (root, args, { db, user }) => {
                if (!user)
                    throw new Error('Not authenticated!');
                return await db.user.findOne({ _id: user.id });
            },
            users: async (root, args, { db, user }) => {
                var regex = new RegExp(args.userName);
                return db.user.find({ $or: [{ userName: { $regex: regex } }, { email: { $regex: regex } }], _id: { $ne: user.id } });
            }
        }
    }
}