module.exports = {
    resolver: {
        Query: {
            me: (root, args, context) => {
                if (!context.user)
                    throw new Error('Not authenticated!');
                return {
                    id: 1,
                    email: 'nero.rodrigues@gmail.com',
                    password: ''
                };
            }
        }
    }
}