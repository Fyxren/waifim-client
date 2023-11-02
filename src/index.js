const { config: insertEnv } = require('dotenv');
const FyClient = require('./client/FyClient');
const config = require('./config/config');
insertEnv();

const client = new FyClient({
    intents: config.intents
});

client.authenticate(process.env.CLIENT_TOKEN);