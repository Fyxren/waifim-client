const EventBase = require('../../utils/EventBase');

class Ready extends EventBase {
    constructor(props) {
        super({ name: 'ready', once: true });
    }

    execute(client) {
        client.restApi.registerSlashCommands();
        client.logger.info(`${client.user.tag} is online`);
    }

}

module.exports = Ready;