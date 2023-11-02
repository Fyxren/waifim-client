const { sep, join } = require('path');
const { readdirSync } = require('node:fs');
const { Collection } = require('discord.js');

class CommandManager {
    commands = new Collection();

    constructor(client) {
        this.client = client;
    }

    get(name) {
        return this.commands.get(name);
    }

    get all() {
        return this.commands;
    }

    load(dir) {
        readdirSync(dir).forEach((subDir) => {
            const commands = readdirSync(`${dir}${sep}${subDir}${sep}`);

            for (const file of commands) {
                const commandInstance = require(join(dir, subDir, file));
                const command = new commandInstance;

                if (command.data.name && typeof (command.data.name) === 'string' && command.data.description) {
                    if (this.commands.get(command.data.name)) return this.client.logger.error(`Two or more commands have the same name: ${command.data.name}`);
                    this.commands.set(command.data.name, command);
                }
            }
        });
    }
}

module.exports = CommandManager;