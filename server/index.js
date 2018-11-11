const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const bodyParser = require('body-parser');
const { createServer } = require('http');
const getSchema = require('./graphql');
const { createDatabase } = require('./database');
const { configureAuthMiddleware } = require('./libs/index');

const createSubscritionServer = ({ app, server }) => {
    httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer)
    return httpServer;
}
require('dotenv').config()
const initApp = async () => {
    const app = express();

    const db = await createDatabase();
    const { schema, resolver } = await getSchema();

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolver,
        introspection: true,
        playground: true,
        context: ({ req }) => {
            if (req)
                return {
                    user: req.user,
                    db
                };
        }
    });

    configureAuthMiddleware('/api/graphql', '/api/subscription', app, server);

    server.applyMiddleware({
        app,
        path: '/api/graphql',
        cors: { origin: '*' },
        bodyParserConfig: bodyParser.json()
    });

    return createSubscritionServer({ app, server });
};

const lauchServer = async (port) => {
    const server = await initApp();
    return new Promise((resolve, reject) =>
        server.listen(port, err => (err ? reject(err) : resolve({ server, port }))));
};

lauchServer(process.env.PORT || 3001).then(
    ({ server, port }) => {
        console.log(`Server listening on port ${port}`)
    });