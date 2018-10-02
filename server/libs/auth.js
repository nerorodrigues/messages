const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');

var privateKEY = fs.readFileSync('private.key', 'utf8');
var publicKEY = fs.readFileSync('public.key', 'utf8');

//const APP_SCRET = 'APP_SECRET';

const configureAuthMiddleware = (graphQLPath, subscriptionPath, express, apolloServer) => {

    apolloServer.subscriptionServerOptions = {
        path: subscriptionPath,
        onConnect: (connectionParams) => {
            if (connectionParams.authToken)
                return verifyToken(connectionParams.authToken).then(pX => {
                    return pX;
                });
            throw new Error('Not authenticated!');
        }
    };

    const auth = jwt({
        secret: publicKEY,
        credentialsRequired: false
    });

    express.use(graphQLPath, auth);
}

const verifyToken = async (authToken) => {
    const valid = await jsonwebtoken.verify(authToken, publicKEY, { algorithm: 'RS256' });
    return valid;
}

const authenticate = (user, options) => {
    var tokenOptions = {
        algorithm: 'RS256',
        issuer: 'myApp',
        ...options
    }
    var token = jsonwebtoken.sign(user, privateKEY, tokenOptions);
    return token;
}

module.exports = { configureAuthMiddleware, verifyToken, authenticate };