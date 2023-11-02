const { readdirSync } = require('node:fs');
const { join } = require('node:path');

class EventManager {
    constructor(client) {
        this.client = client;
    }

    load(dir) {
        readdirSync(dir).forEach((file) => {
            const eventInstance = require(join(dir, file));
            const event = new eventInstance;

            if (event.props.once) {
                this.client.once(event.props.name, (...args) => event.execute(this.client, ...args));
                return;
            }

            this.client.on(event.props.name, (...args) => event.execute(this.client, ...args));
        });
    }
}

module.exports = EventManager;