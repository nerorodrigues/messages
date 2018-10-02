const jsonwebtoken = require('jsonwebtoken');
const controler = require('../../../controler/auth');
const bcryptjs = require('bcryptjs')
const { GraphQLDateTime } = require('graphql-iso-date');

const { authenticate } = require('../../../libs')

module.exports = {
    resolver: {
        DateTime: GraphQLDateTime,
        Mutation: {
            signin: async (root, args, { db }) => {
                var user = await controler.findUser(db, args.username);
                if (user) {
                    var senha = await bcryptjs.hash(args.password, 10);
                    if (await bcryptjs.compare(args.password, user.password)) {
                        return authenticate(
                            { id: user.id, email: user.email },
                            { expiresIn: '1d' }
                        );
                    }
                }
                throw new Error("User not found or Invalid password.");
            },
            signup: async (root, args, { db }) => {
                return await controler.saveUser(db, args)
            },
            checkEmailAvailability: async (root, args, { db }) => {
                return await controler.checkAvailability(db, { email: args.email });
            },
            checkUserNameAvailability: async (root, args, { db }) => {
                return await controler.checkAvailability(db, { userName: args.username });
            }
        }
    }
}