const { join } = require('path');
const { Client } = require('discord.js');
const Logger = require('../utils/Logger');
const CommandManager = require('../managers/CommandManager');
const EventManager = require('../managers/EventManager');
const RestManager = require('../managers/RestManager');
const UtilsManager = require('../managers/UtilsManager');
const RequestManager = require('../managers/RequestManager');
const IntervalManager = require('../managers/IntervalManager');

class FyClient extends Client {
    logger = new Logger('Client');
    commands = new CommandManager(this);
    events = new EventManager(this);
    restApi = new RestManager(this);
    utils = new UtilsManager(this);
    request = new RequestManager(this);
    interval = new IntervalManager(this);

    constructor(options) {
        super(options);
        this.init();
    }

    async authenticate(token) {
        try {
            this.logger.info(`Initializing client with token ${token.substring(0, 5)}******`);
            await this.login(token);
        } catch (e) {
            this.logger.error(`Failed to authenticate client with token ${token.substring(0, 5)}******`);
        }
    }

    init() {
        this.commands.load(join(__dirname, '../commands/'));
        this.events.load(join(__dirname, './events/'));
    }

}

module.exports = FyClient;