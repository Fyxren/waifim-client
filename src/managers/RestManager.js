const { REST, Routes } = require('discord.js');
const config = require('../config/config');
const Logger = require('../utils/Logger');

class RestManager {
    logger = new Logger('Rest');
    DiscordRest = new REST({ version: config.restVersion });

    constructor(client) {
        this.client = client;
        this.DiscordRest.setToken(process.env.CLIENT_TOKEN);
    }

    async registerSlashCommands() {
        try {
            this.logger.info('Initializing application commands.');

            if (!this.client.user?.id) throw new Error('Client user was not resolved while initializing application commands');
            if (process.env.GUILD_ID) {
                await this.DiscordRest.put(Routes.applicationGuildCommands(this.client.user.id, process.env.GUILD_ID), {
                    body: this.client.commands.all.map((command) => command.data.toJSON())
                });
                this.logger.ready(`${this.client.commands.all.size} local application commands registered`);
            } else {
                await this.DiscordRest.put(Routes.applicationCommands(this.client.user.id), {
                    body: this.client.commands.all.map((command) => command.data.toJSON())
                });
                this.logger.ready(`${this.client.commands.all.size} global application commands registered`);
            }

        } catch (e) {
            console.log(e);
            this.logger.error(`Error while registering slash commands: ${e}`);
        }
    }
}

module.exports = RestManager;