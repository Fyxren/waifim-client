const { SlashCommandBuilder } = require('@discordjs/builders');
const CommandBase = require('../../utils/CommandBase');

class Ping extends CommandBase {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('ping')
                .setDescription('Pong!')
        );
    }

    async execute(client, interaction) {
        return interaction.reply({
            embeds: [{
                description: `🏓 Latency: \`${Math.round(client.ws.ping)}ms\``,
                color: client.utils.colors.main,
            }]
        });
    }
}

module.exports = Ping;