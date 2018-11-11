const { homedir } = require('os');
const path = require('path');
const Datastore = require('nedb-promise');
const pkg = require('../package.json')

const defaultDatabaseFilename = () => path.join(homedir(), `${pkg.name}`);
const modelNames = ['user','message','contact'];

const createDatabase = ({ filename = defaultDatabaseFilename(), autoload = true, ...rest } = {}) =>
    modelNames.reduce(
        (db, model) => ({
            ...db,
            [model]: new Datastore({
                filename: `${filename}.${model}.db`,
                autoload,
                ...rest,
            }),
        }),
        {}
    );

const seedDb = async (query, seedName) => {
    const { up } = require(path.join(__dirname, 'seeds', `${seedName}.js`));
    await up(query);
}

module.exports = { createDatabase, seedDb };